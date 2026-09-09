<x-app-layout>
    <x-page-header
        title="Overview"
        description="A snapshot of your classes, students, and today's attendance."
    />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <x-stat-card label="Total Students" valueId="total-student" icon="users" />
        <x-stat-card label="Total Subjects" valueId="total-subject" icon="book-open" accent="blue" />
        <x-stat-card label="Total Sections" valueId="total-section" icon="school" />
    </div>

    <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <!-- Today's attendance (pie chart) -->
        <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <div class="flex items-start justify-between">
                <h3 class="text-base font-semibold text-gray-900 dark:text-white">Today's Attendance</h3>
                <button type="button" data-popover-target="chart-info" data-popover-placement="bottom"
                    class="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600">
                    <span class="sr-only">About this chart</span>
                    <x-icon name="info" class="h-4 w-4" />
                </button>
                <div data-popover id="chart-info" role="tooltip"
                    class="absolute z-10 invisible w-72 text-sm text-gray-500 opacity-0 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                    <div class="p-3 space-y-2">
                        <h3 class="font-semibold text-gray-900 dark:text-white">Present</h3>
                        <p>Shows the total number of students currently present for the day.</p>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Late</h3>
                        <p>Displays the number of students marked as late today.</p>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Absent</h3>
                        <p>Indicates the total percentage of students absent today.</p>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <label for="section-piechart" class="sr-only">Section</label>
                <select id="section-piechart"
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:w-56">
                </select>
            </div>

            <div id="pie-chart-container" class="py-6"></div>
        </div>

        <!-- Scheduled classes for today -->
        <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">Scheduled Classes for Today</h3>
            <div id="table-loader" class="flex items-center justify-center py-10">
                <x-icon name="loader-circle" class="h-6 w-6 animate-spin text-primary-600" />
                <span class="ms-2 text-sm text-gray-500 dark:text-gray-400">Loading data, please wait...</span>
            </div>

            <div id="ongoing-class-schedules"></div>
        </div>
    </div>
</x-app-layout>
