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
    <body class="font-sans antialiased">
        <div class="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            @include('layouts.sidebar')

            <!-- Content column: the sm:ml-64 offset for the fixed sidebar lives
                 here (and only here) so individual pages never repeat it. -->
            <div class="flex min-w-0 flex-1 flex-col sm:ml-64">
                @include('layouts.navbar')

                <main class="flex-1 p-4 sm:p-6 lg:p-8">
                    <div class="mx-auto w-full max-w-7xl">
                        {{ $slot }}
                    </div>
                </main>

                @include('layouts.footer')
            </div>
        </div>
    </body>
    
</html>
