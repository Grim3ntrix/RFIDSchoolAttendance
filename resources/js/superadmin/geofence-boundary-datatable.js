import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { createBoundaryMap } from './boundary-map';
import { refreshIcons } from '../icons';

const GEOCODE_URL = '/superadmin/geofence-boundaries/geocode';

export function initializeGeofenceDatatable() {
    // console.log("School Geofence Boundary page function triggered.");

    /* --- Page display map (read-only boundary preview + toolbar) --- */

    const geofenceBoundary = document.getElementById('geofence-boundary-container');
    const notConfiguredState = document.getElementById('geofence-not-configured');
    const incompleteState = document.getElementById('geofence-incomplete');
    const errorState = document.getElementById('geofence-error');

    function hideAllStates() {
        if (geofenceBoundary) geofenceBoundary.style.display = 'none';
        if (notConfiguredState) notConfiguredState.classList.replace('flex', 'hidden');
        if (incompleteState) incompleteState.classList.replace('flex', 'hidden');
        if (errorState) errorState.classList.replace('flex', 'hidden');
    }

    if (geofenceBoundary) {
        axios.get('/superadmin/geofence-boundaries/map')
        .then(response => {
            const geofenceBoundariesMapData = response.data;

            if (geofenceBoundariesMapData && geofenceBoundariesMapData.configured === true && geofenceBoundariesMapData.state === 'configured') {
                hideAllStates();
                geofenceBoundary.style.display = 'block';

                const data = geofenceBoundariesMapData.data;
                const latitude = parseFloat(data.latitude);
                const longitude = parseFloat(data.longitude);
                const radius = parseFloat(data.radius);

                geofenceBoundary.innerHTML = `
                    <div id="geofence-map" class="h-80 rounded-lg shadow-lg"></div>
                `;

                const displayMap = createBoundaryMap({
                    elementId: 'geofence-map',
                    center: [latitude, longitude],
                    zoom: 16,
                });

                if (displayMap) {
                    displayMap.drawBoundary(latitude, longitude, radius);
                    displayMap.fitBoundary(true);
                }
            } else if (geofenceBoundariesMapData && geofenceBoundariesMapData.state === 'incomplete') {
                hideAllStates();
                incompleteState.classList.replace('hidden', 'flex');
            } else {
                hideAllStates();
                notConfiguredState.classList.replace('hidden', 'flex');
            }
        })
        .catch(error => {
            console.error('Error fetching geofence boundary map data:', error);
            hideAllStates();
            errorState.classList.replace('hidden', 'flex');
            const tableLoader = document.getElementById('table-loader');
            if (tableLoader) tableLoader.style.display = 'none';
        });
    }

    /* --- Add modal: editable boundary map + Auto Fill --- */

    const addGeofenceBoundaryBtn = document.getElementById('add-geofence-boundary-btn');
    const addForm = document.getElementById('add-geofence-boundary-form');
    const schoolNameField = document.getElementById('school_name');
    const addressField = document.getElementById('address');
    const latitudeField = document.getElementById('latitude');
    const longitudeField = document.getElementById('longitude');
    const radiusField = document.getElementById('radius');

    let addBoundaryMap = null;

    /* The map container lives inside a hidden modal. Flowbite removes the
       `hidden` class in its own click handler (before ours finishes), so
       building the map on the next frame gives the container its final
       layout; no fixed-timeout guessing. */
    function ensureAddMap() {
        if (addBoundaryMap) {
            addBoundaryMap.map.invalidateSize();
            return;
        }

        addBoundaryMap = createBoundaryMap({
            elementId: 'add-boundary-map',
            editable: true,
            onBoundaryChange: syncFieldsFromMap,
        });
    }

    function syncFieldsFromMap({ latitude, longitude, radius }) {
        latitudeField.value = latitude.toFixed(6);
        longitudeField.value = longitude.toFixed(6);
        radiusField.value = Math.round(radius);
    }

    function syncMapFromFields() {
        if (! addBoundaryMap) {
            return;
        }

        const latitude = parseFloat(latitudeField.value);
        const longitude = parseFloat(longitudeField.value);
        const radius = parseFloat(radiusField.value);

        if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
            addBoundaryMap.drawBoundary(latitude, longitude, Number.isFinite(radius) ? radius : 100);
            addBoundaryMap.fitBoundary(true);
        }
    }

    [latitudeField, longitudeField, radiusField].forEach(field => {
        field.addEventListener('change', syncMapFromFields);
    });

    addGeofenceBoundaryBtn.addEventListener('click', function (e) {
        const geofenceBoundary = document.getElementById('geofence-boundary-container');
        if (geofenceBoundary) {
            geofenceBoundary.style.display = 'none';
        }

        requestAnimationFrame(() => {
            ensureAddMap();
            syncMapFromFields();
        });
    })

    document.querySelectorAll('[data-modal-hide="geofence-boundary-modal"]').forEach(function (closeTrigger) {
        closeTrigger.addEventListener('click', function () {
            if (geofenceBoundary) {
                geofenceBoundary.style.display = 'block'; // Show the map again
            }
        });
    });

    if (addForm) {
        addForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission

            let formData = new FormData(addForm);

            axios.post('/superadmin/geofence-boundaries', formData)
            .then(response => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 800,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                Toast.fire({
                    icon: "success",
                    title: "School geofence boundary record added successfully!"
                });

                addForm.reset();
                if (addBoundaryMap) {
                    addBoundaryMap.clearBoundary();
                }
                window.location.href = '/superadmin/geofence-boundaries';
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {

                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation

                    for (let key in errors) {
                        let inputElement = document.getElementById(key);
                        let errorMessage = errors[key][0];

                        let errorElement = document.createElement('p');
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'error-message', 'dark:text-red-400');
                        errorElement.innerText = errorMessage;

                        inputElement.after(errorElement);
                    }
                }
            });
        });
    }

    /* Geofence - Auto Fill Button (GPS coordinates + reverse geocoding) */

    const fillLocationBtnContainer = document.getElementById('fill-location-btn-container');

    if (fillLocationBtnContainer) {

        const fillLocationBtnHTML =
        `<button type="button" id="fill-location-btn" class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            <i data-lucide="locate-fixed" class="w-4 h-4"></i>
            Auto Fill
        </button>`;

        fillLocationBtnContainer.innerHTML = fillLocationBtnHTML;
        refreshIcons();

        const fillLocationBtn = document.getElementById('fill-location-btn');

        fillLocationBtn.addEventListener('click', function () {
            if (! navigator.geolocation) {
                Swal.fire({
                    icon: 'error',
                    title: 'Geolocation is not supported by your browser.'
                });
                return;
            }

            fillLocationBtn.disabled = true;

            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                latitudeField.value = latitude;
                longitudeField.value = longitude;
                radiusField.value = 100;

                syncMapFromFields();

                /* Fill school name and address via the reverse geocoding
                   proxy so the whole form is filled, not just coordinates. */
                axios.get(GEOCODE_URL, { params: { lat: latitude, lon: longitude } })
                .then(reverseResponse => {
                    const place = reverseResponse.data;

                    if (place.school_name) {
                        schoolNameField.value = place.school_name;
                    }
                    if (place.address) {
                        addressField.value = place.address;
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Location filled successfully!',
                        showConfirmButton: false,
                        timer: 1200
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Location filled successfully!',
                        text: 'School name and address could not be identified — please enter them manually.',
                        showConfirmButton: false,
                        timer: 2500
                    });
                })
                .finally(() => {
                    fillLocationBtn.disabled = false;
                });
            }, function (error) {
                fillLocationBtn.disabled = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Unable to retrieve location',
                    text: error.message
                });
            });
        });
    }

    /* --- Geofence Boundary Table --- */

    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get(`/superadmin/geofence-boundaries/records`)
        .then(response => {
            const geofenceBoundaries = response.data;

            /* Datatable */

            if (geofenceBoundaries.length > 0) {
                /* No overflow-x wrapper here: simple-datatables hoists its own
                   widget (search bar, .datatable-container, pager) in place of
                   the table, so an overflow div here would scroll the whole
                   widget and stack a second scrollbar under Flowbite's
                   .datatable-container one, which already scrolls the table. */
                const tableHTML = `
                        <table id="geofenceBoundaryTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-4 py-3">School Name</th>
                                    <th scope="col" class="px-4 py-3">Address</th>
                                    <th scope="col" class="px-4 py-3">Latitude</th>
                                    <th scope="col" class="px-4 py-3">Longitude</th>
                                    <th scope="col" class="px-4 py-3">Radius (meters)</th>
                                    <th scope="col" class="px-4 py-3">Status</th>
                                    <th scope="col" class="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`;

                document.getElementById('geofence-boundaries-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#geofenceBoundaryTable tbody');
                tbody.innerHTML = '';

                const geofenceBoundaryStatusColorMap = {
                    'enabled': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                    'disabled': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
                };

                geofenceBoundaries.forEach(geofenceBoundary => {
                    const row = document.createElement('tr');

                    const statusBadge = document.createElement('span');
                    const selectedStatus = geofenceBoundary.geofence_boundary_status.status;

                    // Get the corresponding badge class based on the status
                    const badgeClass = geofenceBoundaryStatusColorMap[selectedStatus] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'; // Default to gray if status not found

                    // Assign class and add text inside the badge
                    statusBadge.className = `text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`;
                    statusBadge.textContent = selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1); // Set the status text inside the badge

                    row.className = 'border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50';
                    row.innerHTML = `
                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${geofenceBoundary.school_name}</td>
                        <td class="px-4 py-3 max-w-xs truncate" title="${geofenceBoundary.address}">${geofenceBoundary.address}</td>
                        <td class="px-4 py-3 whitespace-nowrap">${geofenceBoundary.latitude}</td>
                        <td class="px-4 py-3 whitespace-nowrap">${geofenceBoundary.longitude}</td>
                        <td class="px-4 py-3 whitespace-nowrap">${geofenceBoundary.radius} m</td>
                        <td class="px-4 py-3">${statusBadge.outerHTML}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1">
                                <button type="button" data-modal-target="edit-geofence-boundary-modal" data-modal-toggle="edit-geofence-boundary-modal" data-geofence-boundary-id="${geofenceBoundary.id}" title="Edit boundary"
                                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                    <span class="sr-only">Edit</span>
                                </button>
                                <button type="button" data-modal-target="delete-geofence-boundary-modal" data-modal-toggle="delete-geofence-boundary-modal" data-geofence-boundary-id="${geofenceBoundary.id}" title="Delete boundary"
                                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    <span class="sr-only">Delete</span>
                                </button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                /* Convert <i data-lucide> placeholders before the DataTable
                   takes a copy of the row markup for its re-renders. */
                refreshIcons();

                new DataTable('#geofenceBoundaryTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none';

            } else {
                const emptyStateHTML = `
                    <div class="flex flex-col items-center justify-center px-4 py-16 text-center">
                        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                            <i data-lucide="map-pin" class="w-7 h-7 text-gray-500 dark:text-gray-400"></i>
                        </div>
                        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">No geofence boundaries yet.</h3>
                        <p class="max-w-md text-sm text-gray-500 dark:text-gray-400">Add a boundary to start tracking and managing student locations within designated areas.</p>
                    </div>`;

                document.getElementById('geofence-boundaries-datatable-container').innerHTML = emptyStateHTML;
                refreshIcons();

                document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
            }
        })

        .catch(error => {
            console.error('Error fetching geofence boundary data:', error);
            document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
        });
    }

    /* --- Edit modal (editable boundary map) --- */

    const editGeofenceBoundaryModalContainer = document.getElementById('edit-geofence-boundary-modal-container');

    const editGeofenceBoundaryModal = `
        <div id="edit-geofence-boundary-modal" tabindex="-1" aria-hidden="true" class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
            <div class="relative max-h-full w-full max-w-2xl">
                <div class="relative rounded-xl bg-white shadow dark:bg-gray-800">
                    <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Geofence Boundary
                    </h3>
                    <button type="button" class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-geofence-boundary-modal">
                            <i data-lucide="x" class="w-3.5 h-3.5"></i>
                            <span class="sr-only">Close modal</span>
                    </button>
                    </div>
                    <div class="p-4 md:p-5">
                    <form id="edit-geofence-boundary-form" class="space-y-6">
                        <div class="grid gap-6 md:grid-cols-2">
                            <div>
                                <label for="edit_school_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Name</label>
                                <input type="text" id="edit_school_name" name="school_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter School Name" />
                            </div>
                            <div>
                                <label for="edit_address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" id="edit_address" name="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Address" />
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-3">
                            <div>
                                <label for="edit_latitude" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitude</label>
                                <input type="number" id="edit_latitude" name="latitude" step="any" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" />
                            </div>
                            <div>
                                <label for="edit_longitude" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitude</label>
                                <input type="number" id="edit_longitude" name="longitude" step="any" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" />
                            </div>
                            <div>
                                <label for="edit_radius" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Radius (meters)</label>
                                <input type="number" id="edit_radius" name="radius" step="any" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" />
                            </div>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Boundary Map</label>
                            <div id="edit-boundary-map" class="h-56 rounded-lg border border-gray-200 dark:border-gray-600"></div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Drag the center pin to move the boundary, drag the edge handle to resize the radius, or search for a place on the map.</p>
                        </div>
                        <div class="grid gap-6 md:grid-cols-1">
                            <div>
                                <label for="status_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select id="status_id" name="status_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected disabled>Select a status</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 pt-2">
                            <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Changes</button>
                            <button type="button" data-modal-hide="edit-geofence-boundary-modal" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal HTML into the container
    editGeofenceBoundaryModalContainer.innerHTML = editGeofenceBoundaryModal;
    refreshIcons();

    const editGeofenceBoundaryModalEl = document.getElementById('edit-geofence-boundary-modal');

    let geofenceBoundaryId;
    let editBoundaryMap = null;

    const editLatitudeField = document.getElementById('edit_latitude');
    const editLongitudeField = document.getElementById('edit_longitude');
    const editRadiusField = document.getElementById('edit_radius');

    function ensureEditMap() {
        if (editBoundaryMap) {
            editBoundaryMap.map.invalidateSize();
            return;
        }

        editBoundaryMap = createBoundaryMap({
            elementId: 'edit-boundary-map',
            editable: true,
            onBoundaryChange: ({ latitude, longitude, radius }) => {
                editLatitudeField.value = latitude.toFixed(6);
                editLongitudeField.value = longitude.toFixed(6);
                editRadiusField.value = Math.round(radius);
            },
        });
    }

    if (editGeofenceBoundaryModalEl) {
        const editGeofenceBoundaryModal = new Modal(editGeofenceBoundaryModalEl);

        document.addEventListener('click', function (e) {
            // Ensure the click targets a button with the correct data-modal-toggle attribute
            if (e.target.closest('[data-modal-toggle="edit-geofence-boundary-modal"]')) {
                e.preventDefault();

                geofenceBoundaryId = e.target.closest('button').getAttribute('data-geofence-boundary-id');

                editGeofenceBoundaryModal.show();

                // Build the map once the container has its open-modal layout.
                requestAnimationFrame(ensureEditMap);

                // Hide the map when the modal is opened
                const geofenceBoundary = document.getElementById('geofence-boundary-container');
                if (geofenceBoundary) {
                    geofenceBoundary.style.display = 'none';
                }

                // Fetch all available statuses
                axios.get(`/superadmin/geofence-boundaries/statuses`)
                .then(statusResponse => {
                    const geofenceBoundaryStatusData = statusResponse.data;

                    // Fetch the specific geofence boundary for editing
                    axios.get(`/superadmin/geofence-boundaries/${geofenceBoundaryId}/edit`)
                    .then(boundaryResponse => {
                        const geofenceBoundaryData = boundaryResponse.data;

                        // Populate the form with the geofence boundary data
                        document.getElementById('edit_school_name').value = geofenceBoundaryData.school_name;
                        document.getElementById('edit_address').value = geofenceBoundaryData.address;
                        editLatitudeField.value = parseFloat(geofenceBoundaryData.latitude);
                        editLongitudeField.value = parseFloat(geofenceBoundaryData.longitude);
                        editRadiusField.value = parseFloat(geofenceBoundaryData.radius);

                        // Draw the boundary once the modal map exists.
                        ensureEditMap();

                        editBoundaryMap.drawBoundary(
                            parseFloat(geofenceBoundaryData.latitude),
                            parseFloat(geofenceBoundaryData.longitude),
                            parseFloat(geofenceBoundaryData.radius)
                        );
                        editBoundaryMap.fitBoundary(true);

                        // Populate the status dropdown
                        const statusSelect = document.getElementById('status_id');
                        statusSelect.innerHTML = ''; // Clear previous options

                        // Populate all status options
                        geofenceBoundaryStatusData.forEach(status => {
                            const statusOption = document.createElement('option');
                            statusOption.value = status.id;
                            statusOption.textContent = status.status;

                            // Check if this status is the currently selected one
                            if (status.id === geofenceBoundaryData.geofence_boundary_status.id) {
                                statusOption.selected = true;
                            }

                            statusSelect.appendChild(statusOption);
                        });
                    })
                    .catch(error => {
                        console.error("Error fetching geofence boundary data:", error);
                    });
                })
                .catch(error => {
                    console.error('Error fetching geofence boundary statuses:', error);
                });
            }

            // Hide modal
            if (e.target.closest('[data-modal-hide="edit-geofence-boundary-modal"]')) {
                editGeofenceBoundaryModal.hide();

                if (geofenceBoundary) {
                    geofenceBoundary.style.display = 'block'; // Show the map again
                }
            }
        });
    }

    /* Edit PUT Request - FORM */

    const editForm = document.getElementById('edit-geofence-boundary-form');

    if (editForm) {
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let formData = new FormData(editForm);

            axios.post(`/superadmin/geofence-boundaries/${geofenceBoundaryId}`, formData, {
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                }
            })
            .then(response => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 800,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                Toast.fire({
                    icon: "success",
                    title: "Geofence boundary record updated successfully!"
                });

                editForm.reset();
                if (editBoundaryMap) {
                    editBoundaryMap.clearBoundary();
                }
                window.location.href = `/superadmin/geofence-boundaries`;
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation

                    for (let key in errors) {
                        let inputElement = document.getElementById(`${key}`);
                        let errorMessage = errors[key][0];

                        let errorElement = document.createElement('p');
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'error-message', 'dark:text-red-400');
                        errorElement.innerText = errorMessage;

                        inputElement.after(errorElement);
                    }
                }
            });
        });
    }

    /* Delete - Modal Instance */

    const deleteGeofenceBoundaryModalContainer = document.getElementById('delete-geofence-boundary-modal-container');

    if (deleteGeofenceBoundaryModalContainer) {
        let geofenceBoundaryId; // To hold the ID of the section to delete

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-geofence-boundary-modal"]')) {
                e.preventDefault();

                geofenceBoundaryId = e.target.closest('button').getAttribute('data-geofence-boundary-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="delete-geofence-boundary-modal" tabindex="-1" class="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4">
                        <div class="relative max-h-full w-full max-w-md p-4 md:p-5">
                            <div class="relative rounded-xl bg-white shadow-lg dark:bg-gray-800">
                                <button type="button" class="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-geofence-boundary-modal">
                                    <i data-lucide="x" class="w-3.5 h-3.5"></i>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-6 text-center md:p-8">
                                    <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10">
                                        <i data-lucide="circle-alert" class="w-7 h-7 text-red-500 dark:text-red-400"></i>
                                    </div>
                                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Delete this boundary?</h3>
                                    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">This geofence boundary record will be permanently removed. This action cannot be undone.</p>
                                    <div class="flex justify-center gap-3">
                                        <form action="">
                                            <button type="submit" id="delete-geofence-boundary-confirm-btn" data-modal-hide="delete-geofence-boundary-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-geofence-boundary-cancel-btn" data-modal-hide="delete-geofence-boundary-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteGeofenceBoundaryModalContainer.innerHTML = modalHTML;
                refreshIcons();

                // Show the modal
                const deleteGeofenceBoundaryModalEl = document.getElementById('delete-geofence-boundary-modal');
                const deleteGeofenceBoundaryModal = new Modal(deleteGeofenceBoundaryModalEl);
                deleteGeofenceBoundaryModal.show();

                // Hide the map when the modal is opened
                const geofenceBoundary = document.getElementById('geofence-boundary-container');
                if (geofenceBoundary) {
                    geofenceBoundary.style.display = 'none';
                }

                // Handle confirmation
                document.querySelector('#delete-geofence-boundary-confirm-btn').addEventListener('click', function (e) {
                    e.preventDefault();

                    if (geofenceBoundaryId) {
                        axios.delete(`/superadmin/geofence-boundaries/${geofenceBoundaryId}`)
                        .then(response => {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 800,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                }
                            });

                            Toast.fire({
                                icon: "success",
                                title: "Geofence boundary record deleted successfully!"
                            });

                            window.location.href = `/superadmin/geofence-boundaries`;

                        })
                        .catch(error => {
                            console.error('There was an error deleting the section:', error);
                        });
                    }
                });

                // Handle modal close
                document.querySelector('[data-modal-hide="delete-geofence-boundary-modal"]').addEventListener('click', function () {
                    deleteGeofenceBoundaryModal.hide();
                    deleteGeofenceBoundaryModalContainer.innerHTML = ''; // Clear modal content

                    if (geofenceBoundary) {
                        geofenceBoundary.style.display = 'block'; // Show the map again
                    }
                });

                document.querySelector('#delete-geofence-boundary-cancel-btn').addEventListener('click', function (e) {
                    deleteGeofenceBoundaryModal.hide();
                    deleteGeofenceBoundaryModalContainer.innerHTML = ''; // Clear modal content

                    if (geofenceBoundary) {
                        geofenceBoundary.style.display = 'block'; // Show the map again
                    }
                });
            }
        });
    }
}
