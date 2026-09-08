import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
        './node_modules/flowbite/**/*.js',
    ],  

    safelist: [
        /* User avatar colors — generated in app/Models/User.php but Tailwind
           does not scan PHP model files, so keep this list in sync. */
        'bg-sky-600',
        'bg-cyan-600',
        'bg-teal-600',
        'bg-emerald-600',
        'bg-indigo-600',
        'bg-violet-600',
        'bg-fuchsia-600',
        'bg-pink-600',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            /* Primary brand palette — generated via the Flowbite MCP theme
               tool (brand #16a34a). Green is an accent, not the foundation:
               most surfaces stay neutral gray/white. */
            colors: {
                primary: {
                    50: '#f6f9f7',
                    100: '#e9f1ec',
                    200: '#cee9d8',
                    300: '#98f1b9',
                    400: '#66ea97',
                    500: '#35e475',
                    600: '#1bca5c',
                    700: '#16a64b',
                    800: '#117e39',
                    900: '#0c5a29',
                    950: '#0d351c',
                },
            },
        },
    },

    plugins: [
        forms, 
        flowbitePlugin({
            charts: true,
            datatables: true,
        }),
    ],
    
};
