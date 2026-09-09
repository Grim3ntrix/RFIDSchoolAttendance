<x-app-layout>
    <x-page-header
        title="Section"
        description="Manage your sections, including students and class schedules for each section."
    >
        <x-slot:actions>
            <div id="add-section-container" data-modal-target="add-section-modal" data-modal-toggle="add-section-modal">
                <button type="button" class="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <x-icon name="plus" class="h-4 w-4" />
                    Add Section
                </button>
            </div>
        </x-slot:actions>
    </x-page-header>

    <!-- Add Modal -->
    <div id="add-section-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Add Section
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-section-modal">
                        <span class="sr-only">Close modal</span>
                        <x-icon name="x" class="h-3.5 w-3.5" />
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <form id="add-section-form" method="POST" class="space-y-6">
                        @csrf
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="section_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
                                <input type="text" name="section_name" id="section_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Section Name" />
                            </div>
                            <div>
                                <label for="grade_or_year_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                                <input type="text" name="grade_or_year_level" id="grade_or_year_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Grade or/ Year Level" />
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            <button type="button" data-modal-hide="add-section-modal" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit & Update Modal Container-->
    <div id="edit-section-modal-container"></div>

    <!-- Delete Modal Container-->
    <div id="delete-section-modal-container"></div>

    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6" id="toggle-daily-attendance-content">
        <div id="sections-container" class="space-y-3">
            <!-- Section cards go here -->
        </div>
    </div>
</x-app-layout>
