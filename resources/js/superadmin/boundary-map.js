import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet.fullscreen/Control.FullScreen.css';
import Swal from 'sweetalert2';
import { addBasemap } from '../map-basemap';
import { refreshIcons } from '../icons';

/**
 * Boundary map editor — shared engine for the geofence boundary page.
 *
 * Two contexts, one module:
 *
 *  - Page display map: read-only boundary preview with a toolbar
 *    (recenter, locate me, copy coordinates).
 *  - Add/edit modal: the same map plus an editable boundary — draggable
 *    center marker, a radius handle on the circle's edge, and a place
 *    search box — writing latitude/longitude/radius back into the form
 *    fields live.
 *
 * All geocoding runs through the Laravel proxy
 * (`GET /superadmin/geofence-boundaries/geocode`), never the browser
 * straight to Nominatim.
 */

const GEOCODE_URL = '/superadmin/geofence-boundaries/geocode';

/* A generic world view before any location is known. The Philippines is
   the deployment context for this school system, so it's the sensible
   starting lens for search — the map recenters as soon as a place is
   picked. */
const DEFAULT_VIEW = [12.8797, 121.774];
const DEFAULT_ZOOM = 5;

const OSM_MARKER_ICON = L.icon({
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

/* Solid green dot that marks the boundary center while editing — visually
   distinct from the standard OSM pin so "this is your center, drag it" is
   obvious at a glance. */
const CENTER_HANDLE_ICON = L.divIcon({
    className: 'boundary-center-handle',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

/* Shared Flowbite-styled toolbar chrome. Rendered inside the map so it
   floats above the tiles; classes mirror the page's existing button
   styles (neutral surface, primary-green active state). */
const toolbarButtonClass =
    'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200';

/**
 * Create a map instance with the shared basemap and toolbar.
 *
 * options.elementId   — container div id (required)
 * options.center      — [lat, lng] initial center (default: DEFAULT_VIEW)
 * options.zoom        — initial zoom (default: DEFAULT_ZOOM)
 * options.editable    — enables drag center / radius handle / search
 * options.onBoundaryChange({latitude, longitude, radius}) — form sync callback
 */
export function createBoundaryMap(options) {
    const element = document.getElementById(options.elementId);
    if (! element) {
        return null;
    }

    const map = L.map(element, {
        fullscreenControl: true,
        fullscreenControlOptions: { position: 'topleft' },
        // The editable modal maps are small (h-56) — zoom buttons on top of
        // fullscreen + toolbar + search would crowd the map. Scroll,
        // double-click, and keyboard zoom all still work without them.
        zoomControl: ! options.editable,
        attributionControl: true,
    }).setView(options.center ?? DEFAULT_VIEW, options.zoom ?? DEFAULT_ZOOM);

    /* Hook for the control-row CSS in map-basemap.css — the app's other maps
       must keep Leaflet's default control stacking. */
    map.getContainer().classList.add('boundary-map-container');

    addBasemap(map);

    /* The container can still be settling into its final layout when the map
       is created (modal open transitions) — re-measure on the next frame so
       the viewport size and tiles line up. A map fitted while the container
       is the wrong size computes a nonsense zoom. */
    requestAnimationFrame(() => map.invalidateSize());

    let boundary = null;
    let centerMarker = null;
    let radiusHandle = null;
    let locateMarker = null;
    let toolbar = null;
    let recenterButton = null;

    const notifyBoundaryChange = () => {
        if (options.editable && typeof options.onBoundaryChange === 'function' && boundary) {
            options.onBoundaryChange({
                latitude: boundary.getLatLng().lat,
                longitude: boundary.getLatLng().lng,
                radius: boundary.getRadius(),
            });
        }
    };

    /**
     * Draw the boundary circle. In editable mode the center becomes a
     * draggable marker and the circle's east edge gets a drag handle that
     * resizes the radius.
     */
    function drawBoundary(latitude, longitude, radius) {
        clearBoundary();

        boundary = L.circle([latitude, longitude], {
            color: 'red',
            fillColor: 'blue',
            fillOpacity: 0.1,
            radius: radius,
        }).addTo(map);

        if (options.editable) {
            centerMarker = L.marker([latitude, longitude], {
                icon: CENTER_HANDLE_ICON,
                draggable: true,
                keyboard: true,
                title: 'Boundary center — drag to move',
            }).addTo(map);

            centerMarker.on('drag', () => {
                boundary.setLatLng(centerMarker.getLatLng());
                positionRadiusHandle();
                notifyBoundaryChange();
            });

            addRadiusHandle();
        }
    }

    /* Drag handle sitting on the circle's east edge; dragging it away from
       or toward the center resizes the radius. */
    function addRadiusHandle() {
        const center = boundary.getLatLng();
        const east = destinationPoint(center, boundary.getRadius(), 90);

        radiusHandle = L.marker(east, {
            icon: L.divIcon({
                className: 'boundary-radius-handle',
                iconSize: [14, 14],
                iconAnchor: [7, 7],
            }),
            draggable: true,
            keyboard: true,
            title: 'Radius — drag to resize',
        }).addTo(map);

        radiusHandle.on('drag', () => {
            const radius = map.distance(boundary.getLatLng(), radiusHandle.getLatLng());
            boundary.setRadius(radius);
            notifyBoundaryChange();
        });
    }

    function positionRadiusHandle() {
        if (radiusHandle && boundary) {
            radiusHandle.setLatLng(destinationPoint(boundary.getLatLng(), boundary.getRadius(), 90));
        }
    }

    function clearBoundary() {
        if (boundary) { map.removeLayer(boundary); boundary = null; }
        if (centerMarker) { map.removeLayer(centerMarker); centerMarker = null; }
        if (radiusHandle) { map.removeLayer(radiusHandle); radiusHandle = null; }
    }

    /* Great-circle destination point (needed because map.distance works in
       meters on a sphere — the handle position must be computed the same
       way or it drifts off the circle's edge at larger radii). */
    function destinationPoint(from, distanceMeters, bearingDegrees) {
        const earthRadius = 6371000;
        const bearing = bearingDegrees * Math.PI / 180;
        const lat1 = from.lat * Math.PI / 180;
        const lon1 = from.lng * Math.PI / 180;
        const angular = distanceMeters / earthRadius;

        const lat2 = Math.asin(Math.sin(lat1) * Math.cos(angular) + Math.cos(lat1) * Math.sin(angular) * Math.cos(bearing));
        const lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(angular) * Math.cos(lat1), Math.cos(angular) - Math.sin(lat1) * Math.sin(lat2));

        return L.latLng(lat2 * 180 / Math.PI, lon2 * 180 / Math.PI);
    }

    /* Show the whole circle on screen — the recenter behavior the page
       requested: no scrolling back, one click jumps the view home.

       `instant` skips the fly animation. A flyTo from a world-wide view
       animates through every zoom level, forcing tile loads at each step —
       the boundary circle paints long before the tiles catch up, which
       reads as "a red circle and no map". Initial draws jump instead;
       the toolbar recenter button keeps the animation. */
    function fitBoundary(instant = false) {
        if (! boundary) {
            return;
        }

        map.invalidateSize();

        if (instant) {
            map.fitBounds(boundary.getBounds(), { padding: [30, 30], animate: false });
        } else {
            map.flyToBounds(boundary.getBounds(), { padding: [30, 30] });
        }
    }

    /* Recenter gets a highlighted state whenever the boundary leaves the
       viewport, so the button visibly "wants" to be used exactly when it
       is needed. */
    function updateRecenterState() {
        if (! recenterButton || ! boundary) {
            return;
        }

        const offscreen = ! map.getBounds().contains(boundary.getBounds());
        recenterButton.classList.toggle('boundary-toolbar-active', offscreen);
    }

    map.on('moveend zoomend', updateRecenterState);

    function copyCoordinates() {
        if (! boundary) {
            return;
        }

        const center = boundary.getLatLng();
        const text = `${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}`;

        navigator.clipboard.writeText(text)
            .then(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 800,
                    timerProgressBar: true,
                });

                Toast.fire({ icon: 'success', title: `Copied ${text}` });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Could not copy coordinates',
                    text: 'Your browser blocked clipboard access.',
                });
            });
    }

    function locateMe() {
        if (! navigator.geolocation) {
            Swal.fire({
                icon: 'error',
                title: 'Geolocation is not supported by your browser.',
            });

            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const position_ = [position.coords.latitude, position.coords.longitude];

            if (locateMarker) {
                locateMarker.setLatLng(position_);
            } else {
                locateMarker = L.marker(position_, { icon: OSM_MARKER_ICON })
                    .addTo(map)
                    .bindPopup('Your current location');
            }

            map.flyTo(position_, 16);
            locateMarker.openPopup();
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Unable to retrieve location',
                text: error.message,
            });
        });
    }

    /* --- Toolbar --- */

    function buildToolbar() {
        toolbar = L.control({ position: 'topleft' });

        toolbar.onAdd = () => {
            // leaflet-control is required for the corner layout in
            // map-basemap.css — Leaflet's own controls carry it, but custom
            // controls must add it themselves or they break out of the row.
            const container = L.DomUtil.create('div', 'boundary-map-toolbar leaflet-control');

            container.innerHTML = `
                <button type="button" data-boundary-action="recenter" class="${toolbarButtonClass} !rounded-none !border-b-0 first:!rounded-t-lg" title="Recenter to boundary" aria-label="Recenter to boundary">
                    <i data-lucide="crosshair" class="h-4 w-4"></i>
                </button>
                <button type="button" data-boundary-action="locate" class="${toolbarButtonClass} !rounded-none !border-b-0" title="Locate me" aria-label="Locate me">
                    <i data-lucide="locate-fixed" class="h-4 w-4"></i>
                </button>
                <button type="button" data-boundary-action="copy" class="${toolbarButtonClass} !rounded-none last:!rounded-b-lg" title="Copy coordinates" aria-label="Copy coordinates">
                    <i data-lucide="copy" class="h-4 w-4"></i>
                </button>
            `;

            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.disableScrollPropagation(container);

            container.addEventListener('click', (event) => {
                const button = event.target.closest('[data-boundary-action]');
                if (! button) {
                    return;
                }

                switch (button.dataset.boundaryAction) {
                    case 'recenter': fitBoundary(); break;
                    case 'locate': locateMe(); break;
                    case 'copy': copyCoordinates(); break;
                }
            });

            recenterButton = container.querySelector('[data-boundary-action="recenter"]');
            refreshIcons();

            return container;
        };

        toolbar.addTo(map);
    }

    /* --- Place search (editable maps only) --- */

    let searchAbort = null;

    function renderSuggestionList(list, inputValue) {
        if (list.length === 0) {
            return `<li class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">No matches for "${escapeHtml(inputValue)}"</li>`;
        }

        return list.map((suggestion, index) => `
            <li>
                <button type="button" data-suggestion-index="${index}" class="flex w-full items-start gap-3 px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    <i data-lucide="map-pin" class="mt-0.5 h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"></i>
                    <span class="min-w-0">
                        <span class="block truncate font-medium">${escapeHtml(suggestion.display_name)}</span>
                        ${suggestion.type ? `<span class="block truncate text-xs text-gray-500 dark:text-gray-400">${escapeHtml(suggestion.type)}</span>` : ''}
                    </span>
                </button>
            </li>
        `).join('');
    }

    function buildSearch() {
        // Top-right: the top-left corner already holds zoom/fullscreen plus
        // the toolbar — the search box would crowd or overlap them.
        const search = L.control({ position: 'topright' });

        search.onAdd = () => {
            const container = L.DomUtil.create('div', 'boundary-map-search leaflet-control');

            container.innerHTML = `
                <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <i data-lucide="search" class="h-4 w-4 text-gray-500 dark:text-gray-400"></i>
                    </div>
                    <input type="text" data-boundary-search-input placeholder="Search school or address…" autocomplete="off"
                        class="block w-64 max-w-[calc(100vw-10rem)] rounded-lg border border-gray-300 bg-white p-2 ps-9 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" />
                    <ul data-boundary-search-results class="absolute top-full left-0 z-10 mt-1 hidden w-full divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-lg dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800"></ul>
                </div>
            `;

            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.disableScrollPropagation(container);

            const input = container.querySelector('[data-boundary-search-input]');
            const results = container.querySelector('[data-boundary-search-results]');
            let suggestions = [];

            input.addEventListener('input', () => {
                const query = input.value.trim();

                if (query.length < 3) {
                    results.classList.add('hidden');
                    suggestions = [];
                    return;
                }

                if (searchAbort) {
                    searchAbort.abort();
                }

                searchAbort = new AbortController();

                window.axios.get(GEOCODE_URL, {
                    params: { q: query },
                    signal: searchAbort.signal,
                })
                .then(response => {
                    suggestions = response.data.suggestions ?? [];
                    results.innerHTML = renderSuggestionList(suggestions, query);
                    refreshIcons();
                    results.classList.remove('hidden');
                })
                .catch(error => {
                    if (! window.axios.isCancel(error)) {
                        console.error('Place search failed:', error);
                    }
                });
            });

            results.addEventListener('click', (event) => {
                const button = event.target.closest('[data-suggestion-index]');
                if (! button) {
                    return;
                }

                const suggestion = suggestions[Number(button.dataset.suggestionIndex)];
                if (! suggestion) {
                    return;
                }

                if (boundary) {
                    boundary.setLatLng([suggestion.latitude, suggestion.longitude]);
                    if (centerMarker) {
                        centerMarker.setLatLng([suggestion.latitude, suggestion.longitude]);
                    }
                    positionRadiusHandle();
                    notifyBoundaryChange();
                }

                map.flyTo([suggestion.latitude, suggestion.longitude], 16);
                input.value = '';
                results.classList.add('hidden');
            });

            document.addEventListener('click', (event) => {
                if (! container.contains(event.target)) {
                    results.classList.add('hidden');
                }
            });

            refreshIcons();

            return container;
        };

        search.addTo(map);
    }

    buildToolbar();

    if (options.editable) {
        buildSearch();
    }

    return {
        map,
        drawBoundary,
        clearBoundary,
        fitBoundary,
        setView: (center, zoom) => map.setView(center, zoom),
    };
}

function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
}
