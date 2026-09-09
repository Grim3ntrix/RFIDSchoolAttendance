<x-app-layout>
    <x-page-header
        title="Excuse"
        description="Submit excuse requests for your class schedules and track their review status."
    >
        <x-slot:actions>
            <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" data-tooltip-target="tooltip-student-excuse" data-tooltip-trigger="hover">
                    <span class="sr-only">About excuse requests</span>
                    <x-icon name="info" class="h-4 w-4" />
                </button>
                <div id="tooltip-student-excuse" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Compose your excuse request, and the assigned teacher will review it for approval.
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <div id="class-schedule-container" data-modal-target="compose-excuse-request-modal" data-modal-toggle="compose-excuse-request-modal">
                    <button type="button" class="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <x-icon name="plus" class="h-4 w-4" />
                        Compose
                    </button>
                </div>
            </div>
        </x-slot:actions>
    </x-page-header>

    <!-- Compose Excuse Request Modal -->
    <div id="compose-excuse-request-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Compose Excuse Request
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="compose-excuse-request-modal">
                        <span class="sr-only">Close modal</span>
                        <x-icon name="x" class="h-3.5 w-3.5" />
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="p-4 md:p-5">
                    <form id="excuse-request-form" class="space-y-6">
                        <!-- Section and Class Schedule -->
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="section" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section (auto filled)</label>
                                <input type="text" id="section" name="section" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Selected Section" />
                            </div>
                            <div>
                                <label for="class_schedule" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Schedule</label>
                                <select id="class_schedule" name="class_schedule" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                </select>
                            </div>
                        </div>

                        <!-- Recipient and Proof Link -->
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="recipient" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient (auto filled)</label>
                                <input type="text" id="recipient" name="recipient" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="To whom you're sending the request" />
                            </div>
                            <div>
                                <label for="proof_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proof (document link)</label>
                                <input type="text" id="proof_link" name="proof_link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Paste the link to your proof document" />
                            </div>
                        </div>

                        <!-- Excuse Message -->
                        <div class="grid mb-6 md:grid-cols-1">
                            <label for="excuse_message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Excuse Message</label>
                            <textarea id="excuse_message" name="excuse_message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Explain your reason for absence..."></textarea>
                        </div>

                        <div class="flex items-center gap-3">
                            <button type="submit" class="inline-flex items-center gap-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <x-icon name="send" class="h-4 w-4" />
                                Submit Request
                            </button>
                            <button type="button" data-modal-hide="compose-excuse-request-modal" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Excuse Message Modal Container-->
    <div id="excuse-request-message-modal-container"></div>

    <!-- Excuse Message Modal Container-->
    <div id="excuse-request-class-schedule-attendance-modal-container"></div>

    <!-- Delete Modal Container-->
    <div id="delete-excuse-request-message-modal-container"></div>

    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <div id="table-loader" class="flex justify-center items-center gap-3 py-10">
            <i data-lucide="loader-circle" class="h-8 w-8 animate-spin text-primary-600"></i>
            <span class="text-sm text-gray-500 dark:text-gray-400">Loading data, please wait...</span>
        </div>

        <div id="student-excuse-request-container">
            <!-- Table content goes here -->
        </div>
    </div>
</x-app-layout>
