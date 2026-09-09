import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],

    server: {
        host: '127.0.0.1',
        cors: {
            origin: 'https://rfidschoolattendance.test',
        },
    },

    build: {
        // ApexCharts is ~525 kB minified and cannot be tree-shaken (single
        // pre-bundled dist). It is dynamically imported only on pie-chart
        // pages, so the default 500 kB limit would warn on an already
        // optimal split.
        chunkSizeWarningLimit: 600,
    },
});
