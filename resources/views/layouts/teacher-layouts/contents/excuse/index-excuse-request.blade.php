<x-app-layout>
    <x-page-header
        title="Excuse"
        description="Review student excuse requests for your class schedules and approve or decline them."
    >
        <x-slot:actions>
            <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" data-tooltip-target="tooltip-excuse-review" data-tooltip-trigger="hover">
                <span class="sr-only">How to approve an excuse request</span>
                <x-icon name="info" class="h-4 w-4" />
            </button>
                <div id="tooltip-excuse-review" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    To approve an excuse, please mark the attendance as absent first.
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </x-slot:actions>
    </x-page-header>

    <!-- Excuse Message Container-->
    <div id="excuse-request-message-to-review-modal-container"></div>

    <!-- Excuse Message To Approve Container-->
    <div id="excuse-request-class-schedule-attendance-modal-container"></div>

    <!-- Delete Modal Container-->
    <div id="teacher-excuse-request-to-decline-modal-container"></div>

    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <div id="table-loader" class="flex justify-center items-center gap-3 py-10">
            <i data-lucide="loader-circle" class="h-8 w-8 animate-spin text-primary-600"></i>
            <span class="text-sm text-gray-500 dark:text-gray-400">Loading data, please wait...</span>
        </div>

        <div id="student-excuse-request-to-review-container">
            <!-- Table content goes here -->
        </div>
    </div>
</x-app-layout>
