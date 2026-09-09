<x-app-layout>
    <x-page-header
        title="Report"
        description="Generate a quarterly attendance report as a PDF for a selected student."
    >
        <x-slot:actions>
            <button type="button" id="generate-report-btn"
                class="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <x-icon name="download" class="h-4 w-4" />
                Generate Report
            </button>
        </x-slot:actions>
    </x-page-header>

    <div id="reports-container" class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <form id="reports-form" class="space-y-6">
            <div class="grid gap-4 md:grid-cols-3">
                <div>
                    <label for="section" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                    <select id="section" name="section" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </select>
                </div>
                <div>
                    <label for="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student</label>
                    <select id="student" name="student" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </select>
                </div>
                <div>
                    <label for="quarter" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quarter</label>
                    <select id="quarter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </select>
                </div>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
                <fieldset class="col-span-2">
                    <legend class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quarter Period</legend>
                    <div class="flex items-center">
                        <div class="flex-1">
                            <label for="quarter_start" class="sr-only">Quarter start date</label>
                            <input id="quarter_start" name="quarter_start" type="date" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Select quarter start date">
                        </div>
                        <span class="mx-4 text-sm text-gray-500 dark:text-gray-400">to</span>
                        <div class="flex-1">
                            <label for="quarter_end" class="sr-only">Quarter end date</label>
                            <input id="quarter_end" name="quarter_end" type="date" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Select quarter end date">
                        </div>
                    </div>
                </fieldset>
            </div>
        </form>
    </div>
</x-app-layout>
