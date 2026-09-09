<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="shortcut icon" href="{{ asset('images/mnhs.png') }}?v=1.0" type="image/x-icon">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- SEO Meta Tags -->
        <meta name="description" content="Manage school attendance and track student locations using RFID technology and OpenStreetMap.">
        <meta name="keywords" content="RFID, School Attendance, Student Tracking, OpenStreetMap, Geolocation API">
        <meta name="author" content="Richard K. Samberi">

        <!-- Open Graph Meta Tags -->
        <meta property="fb:app_id" content="1025642422577106" />
        <meta property="og:title" content="{{ config('app.name', 'RFID School Attendance') }}" />
        <meta property="og:description" content="Manage school attendance and track student locations using RFID technology and OpenStreetMap." />
        <meta property="og:image" content="{{ asset('images/mnhs.png') }}" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:type" content="website" />

        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{{ config('app.name', 'RFID School Attendance') }}" />
        <meta name="twitter:description" content="Manage school attendance and track student locations using RFID technology and OpenStreetMap." />
        <meta name="twitter:image" content="{{ asset('images/mnhs.png') }}" />

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Theme: apply before stylesheets load to avoid a flash of the wrong theme -->
        @include('layouts.partials.theme-init')

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans text-gray-900 antialiased bg-gray-50 dark:bg-gray-900">
        <div class="relative min-h-screen flex flex-col sm:justify-center items-center px-6 py-12">

            <!-- No theme toggle here: theme-init applies the user's stored
                 choice (or the OS preference for guests) before first paint,
                 and localStorage persists across logout. The toggle lives in
                 the authenticated navbar only. -->

            <!-- Brand -->
            <a href="/" class="flex flex-col items-center gap-3 mb-8 sm:mb-10">
                <img src="{{ asset('images/mnhs.png') }}" alt="MNHS Logo" class="h-16 w-16 sm:h-20 sm:w-20">
                <span class="flex flex-col items-center">
                    <span class="text-xl font-semibold text-gray-900 dark:text-white">MNHS Attendance</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">RFID school attendance &amp; tracking</span>
                </span>
            </a>

            <!-- Card -->
            <div class="w-full sm:max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 sm:p-8">
                {{ $slot }}
            </div>

            <p class="mt-8 text-xs text-gray-400 dark:text-gray-500">&copy; {{ date('Y') }} MNHS Attendance</p>
        </div>
    </body>
</html>
