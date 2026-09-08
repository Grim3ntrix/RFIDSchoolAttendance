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
