<x-app-layout>
    <x-page-header title="Pre-Register" description="Pre-register teachers by their identification (ID) to enable their registration as new users.">
        <x-slot:actions>
            <button type="button" data-modal-target="add-teacher-modal" data-modal-toggle="add-teacher-modal"
                class="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <x-icon name="plus" class="h-4 w-4" />
                Add Teacher
            </button>
        </x-slot:actions>
    </x-page-header>

    <!-- Add Teacher Modal -->
    <div id="add-teacher-modal" tabindex="-1" aria-hidden="true" class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
        <div class="relative max-h-full w-full max-w-2xl">
            <div class="relative rounded-xl bg-white shadow dark:bg-gray-800">
                <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add Teacher</h3>
                    <button type="button" class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-teacher-modal">
                        <x-icon name="x" class="h-3.5 w-3.5" />
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <form method="POST" id="add-teacher-form" class="space-y-6">
                        @csrf
                        <div class="grid gap-6 md:grid-cols-3">
                            <div>
                                <label for="first_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input type="text" id="first_name" name="first_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter First Name" />
                            </div>
                            <div>
                                <label for="middle_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
                                <input type="text" id="middle_name" name="middle_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter Middle Name" />
                            </div>
                            <div>
                                <label for="last_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input type="text" id="last_name" name="last_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter Last Name" />
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-3">
                            <div>
                                <label for="name_extension" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Name Extension</label>
                                <select id="name_extension" name="name_extension" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                    <option value="" selected disabled>Select an option</option>
                                    <option value="">None</option>
                                    <option value="Jr.">Jr.</option>
                                    <option value="Sr.">Sr.</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                </select>
                            </div>
                            <div>
                                <label for="teacher_id" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Teacher ID</label>
                                <input type="text" id="teacher_id" name="teacher_id" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter Teacher ID" />
                            </div>
                            <div>
                                <label for="sex" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Sex</label>
                                <select id="sex" name="sex" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                    <option value="" selected disabled>Select an option</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-3">
                            <div>
                                <label for="birth_date" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
                                <input type="date" id="birth_date" name="birth_date" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500" />
                            </div>
                            <div>
                                <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" id="email" name="email" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter Email" />
                            </div>
                            <div>
                                <label for="phone_number" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input type="number" id="phone_number" name="phone_number" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter Phone Number" />
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-1">
                            <div>
                                <label for="address" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" id="address" name="address" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter Address" />
                            </div>
                        </div>
                        <div class="flex items-center gap-3 pt-2">
                            <button type="submit" class="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            <button type="button" data-modal-hide="add-teacher-modal" class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit & Update Modal Container-->
    <div id="edit-teacher-modal-container"></div>

    <!-- Delete Modal Container-->
    <div id="delete-teacher-modal-container"></div>

    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div class="flex justify-center items-center py-10" id="table-loader">
            <div role="status" class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <x-icon name="loader-circle" class="h-6 w-6 animate-spin text-primary-600 dark:text-primary-500" />
                Loading data, please wait...
            </div>
        </div>

        <div id="teacher-datatable-container" class="p-4 sm:p-6">
            <!-- Table content goes here -->
        </div>
    </div>
</x-app-layout>
