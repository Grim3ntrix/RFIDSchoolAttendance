<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\GeofenceBoundary;
use App\Models\GeofenceBoundaryStatus;

class GeofenceBoundaryMapRequest extends Controller
{
    public function getGeofenceBoundaryMap()
    {
        $status = GeofenceBoundaryStatus::where('status', 'enabled')->first();

        if (!$status) {
            return response()->json([
                'configured' => false,
                'state' => 'not_configured',
            ]);
        }

        $boundary = GeofenceBoundary::with('geofenceBoundaryStatus')
            ->where('status_id', $status->id)
            ->first();

        if (!$boundary) {
            return response()->json([
                'configured' => false,
                'state' => 'not_configured',
            ]);
        }

        $hasLatitude = !is_null($boundary->latitude);
        $hasLongitude = !is_null($boundary->longitude);
        $hasRadius = !is_null($boundary->radius) && $boundary->radius > 0;

        if (!$hasLatitude || !$hasLongitude || !$hasRadius) {
            return response()->json([
                'configured' => false,
                'state' => 'incomplete',
            ]);
        }

        return response()->json([
            'configured' => true,
            'state' => 'configured',
            'data' => [
                'id' => $boundary->id,
                'latitude' => (float) $boundary->latitude,
                'longitude' => (float) $boundary->longitude,
                'radius' => (float) $boundary->radius,
                'school_name' => $boundary->school_name,
                'address' => $boundary->address,
            ],
        ]);
    }

    public function getEnabledGeofenceBoundary()
    {
        $status = GeofenceBoundaryStatus::where('status', 'enabled')->first();

        if (!$status) {
            return null;
        }

        return GeofenceBoundary::with('geofenceBoundaryStatus')
            ->where('status_id', $status->id)
            ->first();
    }
}
