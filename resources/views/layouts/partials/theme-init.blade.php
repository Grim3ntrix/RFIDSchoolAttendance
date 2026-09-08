<script>
    /* Apply the saved theme (or the OS preference) before first paint to
       avoid a flash of the wrong theme on load. */
    (function () {
        const theme = localStorage.getItem('theme');

        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
    })();
</script>
