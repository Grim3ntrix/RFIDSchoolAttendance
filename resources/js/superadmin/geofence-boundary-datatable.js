import { DataTable } from "simple-datatables";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet.fullscreen/Control.FullScreen.css';
import Swal from 'sweetalert2';
import { addBasemap } from '../map-basemap';
import { refreshIcons } from '../icons';

export function initializeGeofenceDatatable() {
    // console.log("School Geofence Boundary page function triggered.");

    /* Geofence Boundary Map */
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
                const geofenceBoundaryHTML = `
                    <div id="map" class="h-80 rounded-lg shadow-lg"></div>
                `;
                geofenceBoundary.innerHTML = geofenceBoundaryHTML;

                const latitude = parseFloat(data.latitude);
                const longitude = parseFloat(data.longitude);
                const radius = parseFloat(data.radius);

                const map = L.map('map', {
                    fullscreenControl: true,
                    fullscreenControlOptions: {
                        position: 'topleft'
                    }
                }).setView([latitude, longitude], 16);

                addBasemap(map);

                const boundary = L.circle([latitude, longitude], {
                    color: 'red',
                    fillColor: 'blue',
                    fillOpacity: 0.1,
                    radius: radius,
                }).addTo(map);
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

    const addGeofenceBoundaryBtn = document.getElementById('add-geofence-boundary-btn');

    addGeofenceBoundaryBtn.addEventListener('click', function (e) {
        const geofenceBoundary = document.getElementById('geofence-boundary-container');
        if (geofenceBoundary) {
            geofenceBoundary.style.display = 'none';
        }
    })

    document.querySelectorAll('[data-modal-hide="geofence-boundary-modal"]').forEach(function (closeTrigger) {
        closeTrigger.addEventListener('click', function () {
            if (geofenceBoundary) {
                geofenceBoundary.style.display = 'block'; // Show the map again
            }
        });
    });

    const form = document.getElementById('add-geofence-boundary-form');

    if (form){
        form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission
    
        let formData = new FormData(form);
    
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
            
                form.reset();
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

    /* Geofence - Auto Fill Button */

    const fillLocationBtnContainer = document.getElementById('fill-location-btn-container');
    const latitudeField            = document.getElementById('latitude');
    const longitudeField           = document.getElementById('longitude');
    const radiusField              = document.getElementById('radius');

    if (fillLocationBtnContainer) {

        const fillLocationBtnHTML =
        `<button type="button" id="fill-location-btn" class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            <i data-lucide="locate-fixed" class="w-4 h-4"></i>
            Auto Fill
        </button>`;

        fillLocationBtnContainer.innerHTML = fillLocationBtnHTML;
        refreshIcons();

        const fillLocationBtn = document.getElementById('fill-location-btn');
        
        fillLocationBtn.addEventListener('click', function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {

                    latitudeField.value = position.coords.latitude;
                    longitudeField.value = position.coords.longitude;
                    
                    radiusField.value = 100;
                    Swal.fire({
                        icon: 'success',
                        title: 'Location filled successfully!',
                        showConfirmButton: false,
                        timer: 1000
                    });

                }, function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unable to retrieve location',
                        text: error.message
                    });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Geolocation is not supported by your browser.'
                });
            }
        });
    }

    /* Get Geofence Boundary Table*/

    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get(`/superadmin/geofence-boundaries/records`)
        .then(response => {
            const geofenceBoundaries = response.data;

            /* Datatable */

            if (geofenceBoundaries.length > 0) {
                const tableHTML = `
                    <div class="relative overflow-x-auto">
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
                        </table>
                    </div>`;

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

    /* Edit GET Request - Modal Instance */

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

    if (editGeofenceBoundaryModalEl) {
        const editGeofenceBoundaryModal = new Modal(editGeofenceBoundaryModalEl);

        document.addEventListener('click', function (e) {
            // Ensure the click targets a button with the correct data-modal-toggle attribute
            if (e.target.closest('[data-modal-toggle="edit-geofence-boundary-modal"]')) {
                e.preventDefault();

                geofenceBoundaryId = e.target.closest('button').getAttribute('data-geofence-boundary-id');

                editGeofenceBoundaryModal.show();

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
                        document.getElementById('edit_latitude').value = parseFloat(geofenceBoundaryData.latitude);
                        document.getElementById('edit_longitude').value = parseFloat(geofenceBoundaryData.longitude);
                        document.getElementById('edit_radius').value = parseFloat(geofenceBoundaryData.radius);

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
