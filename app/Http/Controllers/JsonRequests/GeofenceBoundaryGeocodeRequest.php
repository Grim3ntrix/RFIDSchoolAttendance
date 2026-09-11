<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

/**
 * Geocoding proxy for the geofence boundary workflow.
 *
 * All OpenStreetMap Nominatim requests go through this endpoint instead of
 * the browser: Nominatim's usage policy requires a real User-Agent and
 * rate limiting (max 1 request/second), which we satisfy once centrally —
 * plus every response is cached so repeated lookups never leave the app.
 *
 * Two modes on one endpoint:
 *   ?q=...        forward geocoding (place name/address -> coordinates)
 *   ?lat=&lon=    reverse geocoding (coordinates -> place name/address)
 */
class GeofenceBoundaryGeocodeRequest extends Controller
{
    private const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/';

    private const CACHE_TTL_DAYS = 30;

    public function geocode(Request $request)
    {
        if ($request->filled('q')) {
            $validated = $request->validate([
                'q' => 'string|max:255',
            ]);

            return response()->json($this->forwardGeocode($validated['q']));
        }

        if ($request->filled(['lat', 'lon'])) {
            $validated = $request->validate([
                'lat' => 'required|numeric|between:-90,90',
                'lon' => 'required|numeric|between:-180,180',
            ]);

            return response()->json($this->reverseGeocode($validated['lat'], $validated['lon']));
        }

        return response()->json([
            'message' => 'A search query (q) or coordinates (lat, lon) are required.',
        ], 422);
    }

    /**
     * Place name/address -> coordinate suggestions for the boundary editor's
     * search box. Returns a compact list; Nominatim can return many results
     * so we trim it to a dropdown-friendly count up front.
     */
    private function forwardGeocode(string $query): array
    {
        // Versioned so a change to the mapped result shape (postcode below)
        // doesn't keep serving the older 30-day cached shape without it.
        $cacheKey = 'geocode:forward:v2:'.md5(mb_strtolower(trim($query)));

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $results = $this->nominatimRequest('search', [
            'q' => $query,
            'format' => 'jsonv2',
            'addressdetails' => 1,
            'limit' => 6,
        ]);

        if ($results === null) {
            return ['suggestions' => []];
        }

        Cache::put($cacheKey, ['suggestions' => $this->mapForwardResults($results)], now()->addDays(self::CACHE_TTL_DAYS));

        return ['suggestions' => $this->mapForwardResults($results)];
    }

    /**
     * Coordinates -> place details for the Auto Fill button. Alongside the
     * display name we surface a school name when the coordinates resolve to
     * one, and a one-line postal address, so the add/edit modal can be
     * filled completely.
     */
    private function reverseGeocode(float $latitude, float $longitude): array
    {
        // Versioned so a change to the lookup parameters (zoom below)
        // doesn't keep serving stale shape from the previous 30-day cache.
        $cacheKey = 'geocode:reverse:v2:'.md5($latitude.','.$longitude);

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $result = $this->nominatimRequest('reverse', [
            'lat' => $latitude,
            'lon' => $longitude,
            'format' => 'jsonv2',
            // Building level: the superadmin typically stands inside the
            // school when pressing Auto Fill, so the nearest building is
            // the feature most likely to carry the school's name. Street
            // level (16) resolves to the road or campus edge instead and
            // regularly loses the name.
            'zoom' => 18,
            'addressdetails' => 1,
        ]);

        if ($result === null) {
            // Upstream failure (timeout, rate limit) — do NOT cache, so the
            // next attempt retries instead of serving an empty result for
            // the next 30 days.
            return [
                'display_name' => null,
                'school_name' => null,
                'address' => null,
            ];
        }

        if (empty($result) || isset($result['error'])) {
            // A legitimate "no result for these coordinates" — safe to cache.
            Cache::put($cacheKey, [], now()->addDays(self::CACHE_TTL_DAYS));

            return [
                'display_name' => null,
                'school_name' => null,
                'address' => null,
            ];
        }

        $address = $result['address'] ?? [];

        $payload = [
            'display_name' => $result['display_name'] ?? null,
            'school_name' => $this->extractSchoolName($result, $address),
            'address' => $this->formatPostalAddress($address),
        ];

        Cache::put($cacheKey, $payload, now()->addDays(self::CACHE_TTL_DAYS));

        return $payload;
    }

    /**
     * Resolve a school name for the Auto Fill button, in order of
     * confidence:
     *
     *   1. The feature itself, when it is school-like — Nominatim's
     *      education category, or a school/college/university amenity (the
     *      legacy tagging of the same thing).
     *   2. A school address part Nominatim attached from the surroundings.
     *   3. The named building at the coordinates — someone pressing Auto
     *      Fill is usually standing in the school, so the nearest building
     *      is the school even when it is tagged as a plain named building.
     *      The field stays editable, so a wrong guess is a one-keystroke
     *      fix rather than a dead end.
     *
     * Streets and residential places are still never used — those are
     * genuine nonsense for a school name.
     */
    private function extractSchoolName(array $result, array $address): ?string
    {
        $schoolTypes = ['school', 'college', 'university', 'kindergarten'];

        $isSchoolFeature = ($result['category'] ?? null) === 'education'
            || (($result['category'] ?? null) === 'amenity' && in_array($result['type'] ?? null, $schoolTypes, true));

        if ($isSchoolFeature && ! empty($result['name'])) {
            return $result['name'];
        }

        foreach ($schoolTypes as $key) {
            if (! empty($address[$key])) {
                return $address[$key];
            }
        }

        if (($result['category'] ?? null) === 'building' && ! empty($result['name'])) {
            return $result['name'];
        }

        return null;
    }

    /**
     * Collapse the address parts Nominatim gives us into the single line the
     * geofence boundary's address field expects.
     */
    private function formatPostalAddress(array $address): ?string
    {
        $parts = [];

        foreach (['road', 'village', 'town', 'city', 'state'] as $key) {
            if (! empty($address[$key])) {
                $parts[] = $address[$key];
            }
        }

        if (! empty($address['postcode'])) {
            $parts[] = $address['postcode'];
        }

        return $parts === [] ? null : implode(', ', $parts);
    }

    /**
     * Returns null when the upstream request fails (timeout, network error)
     * — callers must not cache failures. An empty array means Nominatim
     * answered with nothing, which is cacheable.
     */
    private function nominatimRequest(string $endpoint, array $parameters): ?array
    {
        try {
            $response = Http::withHeaders([
                // Nominatim's usage policy requires a valid User-Agent that
                // identifies the application.
                'User-Agent' => 'RFIDSchoolAttendance/1.0 (school attendance system)',
            ])
                ->timeout(10)
                // PHP's cURL on this Windows host stalls resolving
                // nominatim.openstreetmap.org over IPv6; IPv4 only works.
                // Guzzle's option (not raw CURLOPT — Guzzle rejects that).
                ->withOptions(['force_ip_resolve' => 'v4'])
                ->get(self::NOMINATIM_URL.$endpoint, $parameters);

            if ($response->failed()) {
                return null;
            }

            $data = $response->json();

            return is_array($data) ? $data : null;
        } catch (\Throwable $e) {
            report($e);

            return null;
        }
    }

    private function mapForwardResults(array $results): array
    {
        $suggestions = [];

        foreach ($results as $result) {
            $suggestions[] = [
                'name' => $result['name'] ?? null,
                'display_name' => $result['display_name'] ?? null,
                'type' => $result['type'] ?? null,
                // Surfaced in the suggestion list's detail line so
                // same-named places can be told apart — the postcode pins
                // a result to its locality.
                'postcode' => $result['address']['postcode'] ?? null,
                'latitude' => (float) $result['lat'],
                'longitude' => (float) $result['lon'],
            ];
        }

        return $suggestions;
    }
}
