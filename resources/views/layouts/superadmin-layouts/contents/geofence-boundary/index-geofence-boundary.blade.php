<x-app-layout>
    <x-page-header title="Geofence Boundary" description="Set up geofence boundaries to help track and manage the location status of students within designated areas.">
        <x-slot:actions>
            <button type="button" id="add-geofence-boundary-btn" data-modal-target="geofence-boundary-modal" data-modal-toggle="geofence-boundary-modal"
                class="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <x-icon name="plus" class="h-4 w-4" />
                Add Boundary
            </button>
        </x-slot:actions>
    </x-page-header>

    <!-- Add Geofence Boundary Modal -->
    <div id="geofence-boundary-modal" tabindex="-1" aria-hidden="true" class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
        <div class="relative max-h-full w-full max-w-2xl">
            <div class="relative rounded-xl bg-white shadow dark:bg-gray-800">
                <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add Geofence Boundary</h3>
                    <button type="button" class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="geofence-boundary-modal">
                        <x-icon name="x" class="h-3.5 w-3.5" />
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <form method="POST" id="add-geofence-boundary-form" class="space-y-6">
                        @csrf
                        <div class="grid gap-6 md:grid-cols-2">
                            <div>
                                <label for="school_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">School Name</label>
                                <input type="text" id="school_name" name="school_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter School Name" />
                            </div>
                            <div>
                                <label for="address" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" id="address" name="address" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" placeholder="Enter Address" />
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-3">
                            <div>
                                <label for="latitude" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Latitude</label>
                                <input type="number" id="latitude" name="latitude" step="any" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" />
                            </div>
                            <div>
                                <label for="longitude" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Longitude</label>
                                <input type="number" id="longitude" name="longitude" step="any" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" />
                            </div>
                            <div>
                                <label for="radius" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Radius (meters)</label>
                                <input type="number" id="radius" name="radius" step="any" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500" autocomplete="off" />
                            </div>
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Boundary Map</label>
                            <div id="add-boundary-map" class="h-56 rounded-lg border border-gray-200 dark:border-gray-600"></div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Drag the center pin to move the boundary, drag the edge handle to resize the radius, or search for a place on the map.</p>
                        </div>

                        <div class="flex items-center justify-between gap-3 pt-2">
                            <div id="fill-location-btn-container"></div>
                            <div class="flex items-center gap-3">
                                <button type="submit" class="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                                <button type="button" data-modal-hide="geofence-boundary-modal" class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit & Update Modal Container-->
    <div id="edit-geofence-boundary-modal-container"></div>

    <!-- Delete Modal Container-->
    <div id="delete-geofence-boundary-modal-container"></div>

    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div class="min-h-80 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
            <!-- School Geofence Boundary Container-->
            <div id="geofence-boundary-container">
                <div role="status" class="flex h-80 items-center justify-center gap-3 rounded-lg bg-gray-50 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    <x-icon name="loader-circle" class="h-6 w-6 animate-spin text-primary-600 dark:text-primary-500" />
                    Loading map, please wait...
                </div>
            </div>

            <!-- Empty State: Not Configured -->
            <div id="geofence-not-configured" class="hidden flex-col items-center justify-center px-4 py-16 text-center">
                <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <x-icon name="map-pin" class="h-7 w-7 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">School Geofence</h3>
                <p class="mb-6 max-w-md text-sm text-gray-500 dark:text-gray-400">No geofence has been configured. Configure your school's location to enable attendance validation.</p>
                <button type="button" data-modal-target="geofence-boundary-modal" data-modal-toggle="geofence-boundary-modal"
                    class="rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Configure Geofence
                </button>
            </div>

            <!-- Empty State: Incomplete -->
            <div id="geofence-incomplete" class="hidden flex-col items-center justify-center px-4 py-16 text-center">
                <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10">
                    <x-icon name="alert-triangle" class="h-7 w-7 text-amber-500 dark:text-amber-400" />
                </div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Geofence configuration is incomplete.</h3>
                <p class="mb-6 max-w-md text-sm text-gray-500 dark:text-gray-400">Latitude, longitude or radius is missing. Please complete the configuration to enable the map.</p>
                <button type="button" data-modal-target="geofence-boundary-modal" data-modal-toggle="geofence-boundary-modal"
                    class="rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Edit Configuration
                </button>
            </div>

            <!-- Empty State: Server Error -->
            <div id="geofence-error" class="hidden flex-col items-center justify-center px-4 py-16 text-center">
                <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10">
                    <x-icon name="x-circle" class="h-7 w-7 text-red-500 dark:text-red-400" />
                </div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Unable to load geofence configuration.</h3>
                <p class="mb-6 max-w-md text-sm text-gray-500 dark:text-gray-400">Please try again later.</p>
            </div>
        </div>

        <div class="flex justify-center items-center py-10" id="table-loader">
            <div role="status" class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <x-icon name="loader-circle" class="h-6 w-6 animate-spin text-primary-600 dark:text-primary-500" />
                Loading data, please wait...
            </div>
        </div>

        <div id="geofence-boundaries-datatable-container" class="p-4 sm:p-6">
            <!-- Table content goes here -->
        </div>
    </div>
</x-app-layout>
