<x-app-layout>
    <x-page-header
        title="Attendance"
        description="Tap or scan RFID serial numbers to record student attendance in real time."
    />

    <!-- Time Counting -->
    <div class="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p id="current-time" class="text-4xl font-bold tabular-nums text-gray-900 truncate dark:text-white sm:text-5xl">00:00:00 --</p>
        <p id="current-date" class="mt-2 text-sm text-gray-500 truncate dark:text-gray-400 sm:text-base">-- -- --</p>
    </div>

    <form id="rfid-attendance-form" class="mt-6">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">

            <!-- Section and Class Schedules Input -->
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <div>
                    <label for="section" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                    <select id="section" name="section" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </select>
                </div>
                <div class="mt-4">
                    <label for="class_schedule" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Schedule</label>
                    <select id="class_schedule" name="class_schedule" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </select>
                </div>
            </div>

            <!-- RFID Input -->
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <div class="flex justify-end">
                    <button type="button" data-tooltip-target="tooltip-hover" data-tooltip-trigger="hover"
                        class="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600">
                        <span class="sr-only">About RFID input</span>
                        <x-icon name="info" class="h-4 w-4" />
                    </button>
                    <div id="tooltip-hover" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Tap or Scan RFID Serial Number.
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <span class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-700 dark:bg-primary-600/10 dark:text-primary-400">
                        <x-icon name="scan-line" class="h-8 w-8" />
                    </span>
                    <div class="mt-4 w-full">
                        <label for="rfid_serial_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RFID Serial Number</label>
                        <input type="number" id="rfid_serial_number" name="rfid_serial_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0000000000" />
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div class="mt-6 flex flex-row justify-center gap-3">
        <div id="separator-daily-attendance"></div>
        <div id="separator-attendance-history"></div>
    </div>

    <div class="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6" id="toggle-daily-attendance-content">
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">Attendance Logs for Today</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Quick overview of today's attendance records.</p>

        <div id="table-loader" class="flex items-center justify-center py-10">
            <x-icon name="loader-circle" class="h-6 w-6 animate-spin text-primary-600" />
            <span class="ms-2 text-sm text-gray-500 dark:text-gray-400">Loading data, please wait...</span>
        </div>

        {{-- No overflow-x-auto: the datatable widget hoists here (search bar + Flowbite's
             scrollable .datatable-container + pager); an overflow container would scroll
             the whole widget and stack a second scrollbar under the table's own. --}}
        <div id="daily-attendance-table-container" class="mt-4">
            <!-- Table content goes here -->
        </div>
    </div>

    <div class="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6" id="toggle-attendance-history-content">
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">Review Previous Attendances</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Access and review past attendance records.</p>

        <!-- Dropdown Filters -->
        <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- Section Dropdown -->
            <div>
                <label for="section_to_review_prev_att" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                <select id="section_to_review_prev_att" name="section_to_review_prev_att" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <!-- Options go here -->
                </select>
            </div>

            <!-- Class Schedule Dropdown -->
            <div>
                <label for="class_schedule_to_review_prev_att" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Schedule</label>
                <select id="class_schedule_to_review_prev_att" name="class_schedule_to_review_prev_att" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <!-- Options go here -->
                </select>
            </div>
        </div>

        {{-- No overflow-x-auto: the datatable widget hoists here (search bar + Flowbite's
             scrollable .datatable-container + pager); an overflow container would scroll
             the whole widget and stack a second scrollbar under the table's own. --}}
        <div id="review-previous-attendances-table-container" class="mt-4">
            <!-- Table content goes here -->
        </div>
    </div>

    <div id="view-attendance-history-modal-container"></div>
</x-app-layout>
