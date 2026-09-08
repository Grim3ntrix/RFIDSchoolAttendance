import L from 'leaflet';
import '../css/map-basemap.css';

/* Plain OpenStreetMap tiles — no API key, no third-party provider.
   Dark mode is handled by inverting the tiles via CSS (map-basemap.css). */
const OSM_TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/**
 * Adds an OpenStreetMap basemap that follows the app's light/dark theme.
 * Both themes use the same tiles: in dark mode a CSS filter inverts them
 * into a dark theme (labels included), so no tile layer swap is needed.
 * Markers and overlays are unaffected by the filter.
 *
 * The theme source of truth is the `dark` class on <html> (toggled by the
 * theme toggle or the OS preference) — a MutationObserver keeps the map in
 * sync with any change, including while the map is open.
 *
 * The "Leaflet" prefix is removed from the attribution control; the
 * OpenStreetMap attribution is required and stays.
 */
export function addBasemap(map) {
    const root = document.documentElement;
    const container = map.getContainer();

    const isDark = () => root.classList.contains('dark');

    let currentTheme = isDark() ? 'dark' : 'light';

    L.tileLayer(OSM_TILES, {
        maxZoom: 19,
        keepBuffer: 4, // keep more tiles around the viewport so panning doesn't re-fetch
        attribution: OSM_ATTRIBUTION,
    }).addTo(map);

    map.attributionControl.setPrefix(false);
    container.classList.toggle('dark-basemap', currentTheme === 'dark');

    const observer = new MutationObserver(() => {
        const nextTheme = isDark() ? 'dark' : 'light';
        if (nextTheme === currentTheme) {
            return;
        }

        container.classList.toggle('dark-basemap', nextTheme === 'dark');
        currentTheme = nextTheme;
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    map.on('unload', () => {
        observer.disconnect();
    });
}
