<x-app-layout>
    <x-page-header
        title="Overview"
        description="Track your attendance totals per class schedule and date range."
    >
        <x-slot:actions>
            <button type="button" class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" data-tooltip-target="tooltip-student-overview" data-tooltip-trigger="hover">
                <span class="sr-only">How attendance totals are calculated</span>
                <x-icon name="info" class="h-4 w-4" />
            </button>
            <div id="tooltip-student-overview" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Data will be automatically provided only after filling all three selections.
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
        </x-slot:actions>
    </x-page-header>

    <!-- Filters -->
    <div class="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <div class="grid gap-4 md:grid-cols-3 md:items-end">
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">My Section</label>
                <p id="section-name" class="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">- - -</p>
            </div>
            <div>
                <label for="class-schedule-student-overview" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Schedule</label>
                <select id="class-schedule-student-overview" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                </select>
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Range</label>
                <div class="flex items-center gap-2">
                    <input id="start-date" type="date" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" aria-label="Start date">
                    <span class="text-sm text-gray-500 dark:text-gray-400">to</span>
                    <input id="end-date" type="date" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" aria-label="End date">
                </div>
            </div>
        </div>
    </div>

    <!-- Attendance Totals -->
    <div class="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <x-stat-card label="Total Present" valueId="total-present" icon="check" accent="primary" />
        <x-stat-card label="Total Late" valueId="total-late" icon="clock" accent="red" />
        <x-stat-card label="Total Absent" valueId="total-absent" icon="x-circle" accent="gray" />
        <x-stat-card label="Total Excuse" valueId="total-excuse" icon="file-text" accent="amber" />
    </div>

    <!-- Student Watch Position (location-sharing hook, no visible UI) -->
    <div id="student-watch-position"></div>
</x-app-layout>
