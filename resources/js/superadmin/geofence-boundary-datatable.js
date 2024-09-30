import { DataTable } from "simple-datatables";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.js'; 
import 'leaflet.fullscreen/Control.FullScreen.css'; 
import Swal from 'sweetalert2';

export function initializeGeofenceDatatable() {
    console.log("School Geofence Boundary page function triggered.");

    /* Geofence Boundary Map */
const geofenceBoundary = document.getElementById('geofence-boundary-container');

if (geofenceBoundary) {
    axios.get('/superadmin/geofence-boundaries/map')
    .then(response => {
        const geofenceBoundariesMapData = response.data;

        if (geofenceBoundariesMapData) {
            const geofenceBoundaryHTML = `
                <div id="map" class="h-80 my-8 rounded-lg bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 dark:bg-gray-800 shadow-lg p-6"></div>
            `;
            geofenceBoundary.innerHTML = geofenceBoundaryHTML;

            const latitude = parseFloat(geofenceBoundariesMapData.latitude);
            const longitude = parseFloat(geofenceBoundariesMapData.longitude);
            const radius = parseFloat(geofenceBoundariesMapData.radius);

            // Leaflet map centered at the given latitude and longitude
            const map = L.map('map', {
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: 'topleft'
                }
            }).setView([latitude, longitude], 16);

            // Add a tile layer to the map
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add a geofence boundary (circle)
            const boundary = L.circle([latitude, longitude], {
                color: 'red',
                fillColor: '#blue',
                fillOpacity: 0.1,
                radius: radius,
            }).addTo(map);
        }
    })
    .catch(error => {
        console.error('Error fetching geofence boundary map data:', error);
        document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
    });
}


    const addGeofenceBoundaryBtn = document.getElementById('add-geofence-boundary-btn');

    addGeofenceBoundaryBtn.addEventListener('click', function (e) {
        const geofenceBoundary = document.getElementById('geofence-boundary-container');
        if (geofenceBoundary) {
            geofenceBoundary.style.display = 'none';
        }
    })

    document.querySelector('[data-modal-hide="geofence-boundary-modal"]').addEventListener('click', function () {

        if (geofenceBoundary) {
            geofenceBoundary.style.display = 'block'; // Show the map again
        }
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
                        errorElement.classList.add('text-red-500', 'text-xs', 'mt-1', 'error-message');
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
        `<button type="button" id="fill-location-btn" class="flex items-center text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            <svg class="w-4 h-4 mr-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
            </svg>
            Auto Fill
        </button>`;

        fillLocationBtnContainer.innerHTML = fillLocationBtnHTML;

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
                    <table id="geofenceBoundaryTable" class="bg-gray-50 dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th>
                                    <span class="flex items-center">
                                        School Name
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Address
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Latitude
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Longitude
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Radius (meters)
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Status
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Action
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                </table>`;

                document.getElementById('geofence-boundaries-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#geofenceBoundaryTable tbody');
                tbody.innerHTML = '';

                const geofenceBoundaryStatusColorMap = {
                    'enabled': 'bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400',
                    'disabled': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-500',
                };
                
                geofenceBoundaries.forEach(geofenceBoundary => {
                    const row = document.createElement('tr');

                    const statusBadge = document.createElement('span');
                    const selectedStatus = geofenceBoundary.geofence_boundary_status.status;

                    // Get the corresponding badge class based on the status
                    const badgeClass = geofenceBoundaryStatusColorMap[selectedStatus] || 'bg-gray-100 text-gray-800'; // Default to gray if status not found

                    // Assign class and add text inside the badge
                    statusBadge.className = `text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`;
                    statusBadge.textContent = selectedStatus; // Set the status text inside the badge

                    row.innerHTML = `
                        <td>${geofenceBoundary.school_name}</td>
                        <td>${geofenceBoundary.address}</td>
                        <td>${geofenceBoundary.latitude}</td>
                        <td>${geofenceBoundary.longitude}</td>
                        <td>${geofenceBoundary.radius } m</td>
                        <td>${statusBadge.outerHTML}</td>
                        <td>
                            <button type="button" data-modal-target="edit-geofence-boundary-modal" data-modal-toggle="edit-geofence-boundary-modal" class="text-blue-500 hover:underline" data-geofence-boundary-id="${geofenceBoundary.id}">
                                <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                                </svg>
                            </button> 
                            <button type="button" data-modal-target="delete-geofence-boundary-modal" data-modal-toggle="delete-geofence-boundary-modal" class="text-red-500 hover:underline" data-geofence-boundary-id="${geofenceBoundary.id}">
                                <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                new DataTable('#geofenceBoundaryTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none';

            } else {
                const tableHTML = `
                    <table id="geofenceBoundaryTable" class="bg-gray-50 dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th>
                                    <span class="flex items-center">
                                        School Name
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Address
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Latitude
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Longitude
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Radius (meters)
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Status
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Action
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                </table>`;

                document.getElementById('geofence-boundaries-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#geofenceBoundaryTable tbody');
                tbody.innerHTML = '';

                new DataTable('#geofenceBoundaryTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

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
       <div id="edit-geofence-boundary-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Geofence Boundary
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-geofence-boundary-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                    </div>
                    <div class="p-4 md:p-5 space-y-4">   
                    <form id="edit-geofence-boundary-form">
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="school_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Name</label>
                                <input type="text" id="edit_school_name" name="school_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter School Name" />
                            </div>
                            <div>
                                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" id="edit_address" name="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter Address" />
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                            <div>
                                <label for="latitude" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitude</label>
                                <input type="number" id="edit_latitude" name="latitude" step="any" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" />
                            </div>
                            <div>
                                <label for="longitude" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitude</label>
                                <input type="number" id="edit_longitude" name="longitude" step="any" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" />
                            </div>
                            <div>
                                <label for="radius" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Radius (meters)</label>
                                <input type="number" id="edit_radius" name="radius" step="any" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" />
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-1">
                            <div>
                                <label for="status_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select id="status_id" name="status_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Open melect menu</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal HTML into the container
    editGeofenceBoundaryModalContainer.innerHTML = editGeofenceBoundaryModal;

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
                        errorElement.classList.add('text-red-500', 'text-xs', 'mt-1', 'error-message');
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
                    <div id="delete-geofence-boundary-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center" data-modal-hide="delete-geofence-boundary-modal">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-6 text-center">
                                    <svg class="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Delete Student?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including student and attendance records will be permanently removed. This action cannot be undone.</p>
                                    <div class="flex justify-center space-x-3">
                                        <form action="">
                                            <button type="submit" id="delete-geofence-boundary-confirm-btn" data-modal-hide="delete-geofence-boundary-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
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
