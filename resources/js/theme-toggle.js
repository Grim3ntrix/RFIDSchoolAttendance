/*
 * Light/dark theme toggle (Flowbite pattern).
 *
 * The `dark` class on <html> is the single source of truth — Tailwind's
 * darkMode: 'class' strategy and the map basemap both key off it. An
 * explicit choice is stored in localStorage.theme ('light' | 'dark');
 * when unset, the OS preference is followed, including live changes.
 */
const STORAGE_KEY = 'theme';

function storedTheme() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
        return null;
    }
}

function storeTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
        /* Private browsing — the toggle still works for this page view */
    }
}

function setDark(enabled) {
    document.documentElement.classList.toggle('dark', enabled);
}

export function initializeThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle-btn');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');

            setDark(!isDark);
            storeTheme(!isDark ? 'dark' : 'light');
        });
    }

    /* Follow OS theme changes live, but only when the user has not
       made an explicit choice. */
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!storedTheme()) {
            setDark(e.matches);
        }
    });
}
