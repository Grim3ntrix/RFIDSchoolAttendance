<x-app-layout>
    <x-page-header
        title="Class Schedules"
        description="List of class schedules in {{ $section->grade_or_year_level }}-{{ $section->section_name }}."
    >
        <x-slot:actions>
            <div id="add-class-schedule-container" data-modal-target="add-class-schedule-modal" data-modal-toggle="add-class-schedule-modal">
                <button type="button" class="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <x-icon name="plus" class="h-4 w-4" />
                    Add Class Schedule
                </button>
            </div>
        </x-slot:actions>
    </x-page-header>

    <!-- Add Class Schedule Modal -->
    <div id="add-class-schedule-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Add Class Schedule
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-class-schedule-modal">
                        <span class="sr-only">Close modal</span>
                        <x-icon name="x" class="h-3.5 w-3.5" />
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <form id="add-class-schedule-form" class="space-y-6">
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                <input type="text" id="subject" name="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Subject" />
                            </div>
                            <div>
                                <label for="subject_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Code</label>
                                <input type="text" id="subject_code" name="subject_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Subject Code" />
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="start_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <x-icon name="clock" class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <input type="time" id="start_time" name="start_time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" min="00:00" max="24:00" />
                                </div>
                            </div>
                            <div>
                                <label for="end_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <x-icon name="clock" class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <input type="time" id="end_time" name="end_time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" min="00:00" max="24:00" />
                                </div>
                            </div>
                        </div>
                        <div class="grid mb-6 md:grid-cols-1">
                            <label for="days_of_weeks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days of Weeks</label>
                            <select multiple id="days_of_weeks" name="days_of_weeks[]" size="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            </select>
                        </div>
                        <div class="flex items-center gap-3">
                            <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            <button type="button" data-modal-hide="add-class-schedule-modal" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit & Update Modal Container-->
    <div id="edit-class-schedule-modal-container"></div>

    <!-- Delete Modal Container-->
    <div id="delete-class-schedule-modal-container"></div>

    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6" id="toggle-daily-attendance-content">
        <div id="table-loader" class="flex items-center justify-center py-10">
            <x-icon name="loader-circle" class="h-6 w-6 animate-spin text-primary-600" />
            <span class="ms-2 text-sm text-gray-500 dark:text-gray-400">Loading data, please wait...</span>
        </div>

        <div id="class-schedule-datatable-container" class="mt-4">
            <!-- Table content goes here -->
        </div>
    </div>

    <script>
        const sectionSlug = "{{ $section->slug }}";
    </script>
</x-app-layout>
