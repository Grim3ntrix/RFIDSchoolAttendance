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

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans text-gray-900 antialiased">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <a href="/">
                    <img src="{{ asset('images/mnhs.png') }}" alt="MNHS Logo" class="w-40 h-40">
                </a>
            </div>

            <div class="w-full sm:max-w-lg mt-6 px-6 py-4 bg-gradient-to-b from-white to-gray-50 dark:bg-gray-800 border border-gray-300 shadow-lg overflow-hidden sm:rounded-lg">
                {{ $slot }}
            </div>
        </div>
    </body>
</html>
