<footer class="border-t border-gray-200 px-4 py-4 sm:px-6 lg:px-8 dark:border-gray-700">
    <span class="flex flex-col gap-1 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
        <span>
            @if ('2024' === \Carbon\Carbon::now()->format('Y'))
                © 2024
            @else
                © 2024-{{ \Carbon\Carbon::now()->format('Y') }}
            @endif
            <a href="https://www.rfidschoolattendance.online" target="_blank" rel="noopener noreferrer" class="hover:underline">RFID School Attendance</a>. All Rights Reserved.
        </span>
        <span>Version {{ config('app.version') }}</span>
    </span>
</footer>
