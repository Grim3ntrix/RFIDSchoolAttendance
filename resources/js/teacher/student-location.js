import { DataTable } from "simple-datatables";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet.fullscreen/Control.FullScreen.css';
import { addBasemap } from '../map-basemap';

export function studentLocationPage() {
    // console.log("Student location page function triggered.");

    /* Get Students Table*/

    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get(`/teacher/student-locations/request`)
        .then(response => {
            const sectionWithStudents = response.data;

            if (sectionWithStudents.length > 0) {
                const tableHTML = `
                    <table id="studentLocationTable" class="bg-gray-50 dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th>
                                    <span class="flex items-center">
                                        Action
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        School ID
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Full Name
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Sex
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Section
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Grade/Yr. Level
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        User Status
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Location Status
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                </table>`;
            
                document.getElementById('student-locations-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#studentLocationTable tbody');
                tbody.innerHTML = '';
            
                // Loop through each section
                sectionWithStudents.forEach(sectionWithStudent => {
                    const sectionName = sectionWithStudent.section_name;
                    const gradeOrYearLevel = sectionWithStudent.grade_or_year_level;

                    // Loop through each student in the section
                    sectionWithStudent.student.forEach(student => {
                        const user = student.user;
                        const userStatus = user.userstatus ? user.userstatus.status : 'N/A';

                        // Initialize student location status as 'unavailable'
                        let studentLocationStatus = 'unavailable';

                        // If user is online, check if the student has any locations and their statuses
                        if (userStatus !== 'offline') {
                            if (student.student_location.length > 0) {
                                // Get the most recent location status
                                const recentLocation = student.student_location[student.student_location.length - 1];
                                studentLocationStatus = recentLocation.student_location_status ? 
                                    recentLocation.student_location_status.status : 'unknown'; // Set status or default to unknown
                            }
                        }

                        const buttonDisabled = userStatus === 'offline' ? 'disabled cursor-not-allowed text-gray-400' : 'text-blue-500 hover:underline';
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>
                                <button type="button" ${userStatus === 'offline' ? 'disabled' : ''} data-modal-target="student-location-modal" data-modal-toggle="student-location-modal" class="${buttonDisabled}" data-student-id="${student.id}">
                                    <svg class="w-7 h-6 ${userStatus === 'offline' ? 'text-gray-400' : 'text-gray-800 dark:text-white hover:text-blue-500'} transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </td>
                            <td>${student.school_id}</td>
                            <td>${student.first_name} ${student.last_name} ${student.middle_name ?? ''} ${student.name_extension ?? ''}</td>
                            <td>${student.sex}</td>
                            <td>${sectionName}</td>
                            <td>${gradeOrYearLevel}</td>
                            <td>${userStatus}</td>
                            <td>${studentLocationStatus}</td>
                        `;
                        tbody.appendChild(row);
                    });
                });
            
                new DataTable('#studentLocationTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });
            
                document.getElementById('table-loader').style.display = 'none';
            } else {
                const tableHTML = `
                    <table id="studentLocationTable" class="bg-gray-50 dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th>
                                    <span class="flex items-center">
                                        Action
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        School ID
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Full Name
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Sex
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Section
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Grade/Yr. Level
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        User Status
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Location Status
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                </table>`;

                document.getElementById('student-locations-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#studentLocationTable tbody');
                tbody.innerHTML = '';

                new DataTable('#studentLocationTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
            }
        })
            
        .catch(error => {
            console.error('Error fetching student location data:', error);
            document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
        });
    }

/* Student Location - Modal Instance */

const studentLocationModalContainer = document.getElementById('student-location-modal-container');

if (studentLocationModalContainer) {
    let studentId; // To hold the ID of the student whose location we want to display
    let mapInstance = null; // To hold the modal's map so it can be destroyed on close

    document.addEventListener('click', function (e) {
        if (e.target.closest('[data-modal-toggle="student-location-modal"]')) {
            e.preventDefault();

            studentId = e.target.closest('button').getAttribute('data-student-id');

            // Create modal HTML with map container
            const modalHTML = `
                <div id="student-location-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                    <div class="relative p-6 w-full max-w-4xl max-h-full">
                        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                            <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 flex justify-center items-center" data-modal-hide="student-location-modal">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-6 text-center">
                                <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Student Location</h3>
                                <div id="map" class="w-full h-96 mb-4"></div> <!-- Map container -->
                                <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">Displaying the location of student, offered by <strong>RFID School Attendance</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>`;

            // Inject the modal into the container
            studentLocationModalContainer.innerHTML = modalHTML;

            // Show the modal
            const studentLocationModalEl = document.getElementById('student-location-modal');
            const studentLocationModal = new Modal(studentLocationModalEl);
            studentLocationModal.show();

            
            // Fetch geofence boundary map data
            axios.get('/teacher/geofence-boundaries/map')
            .then(response => {
                const geofenceBoundariesMapData = response.data;
                
                if (geofenceBoundariesMapData && geofenceBoundariesMapData.configured === true && geofenceBoundariesMapData.state === 'configured') {
                    const data = geofenceBoundariesMapData.data;
                    const latitude  = parseFloat(data.latitude);
                    const longitude = parseFloat(data.longitude);
                    const radius    = parseFloat(data.radius);

                    const map = L.map('map', {
                        fullscreenControl: true,
                        fullscreenControlOptions: {
                            position: 'topleft'
                        }
                    }).setView([latitude, longitude], 16);

                    addBasemap(map);
                    mapInstance = map;

                    const boundary = L.circle([latitude, longitude], {
                        color: 'red',
                        fillColor: 'blue',
                        fillOpacity: 0.1,
                        radius: radius,
                    }).addTo(map);

                    // Fetch the student's location
                    axios.get(`/teacher/student/${studentId}/location`)
                    .then(studentResponse => {
                        const studentLocation = studentResponse.data;
                        const studentLat = parseFloat(studentLocation.latitude);
                        const studentLng = parseFloat(studentLocation.longitude);

                        const customIcon = L.icon({
                            iconUrl: '/images/marker-icon.png',
                            shadowUrl: '/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });
                        
                        const studentMarker = L.marker([studentLat, studentLng], { icon: customIcon })
                            .addTo(map);

                        const distanceFromBoundary = map.distance([latitude, longitude], [studentLat, studentLng]);

                        if (distanceFromBoundary <= radius) {
                            studentMarker.bindPopup(`Student is inside the boundary`).openPopup();
                        } else {
                            studentMarker.bindPopup(`Student is outside the boundary`).openPopup();
                        }

                        map.setView([studentLat, studentLng], 16);
                    })
                    .catch(error => {
                        console.error('Error fetching student location:', error);
                    });
                } else {
                    const mapContainer = document.getElementById('map');
                    if (mapContainer) {
                        let message = 'Unable to load geofence configuration. Please try again later.';
                        if (geofenceBoundariesMapData && geofenceBoundariesMapData.state === 'incomplete') {
                            message = 'Geofence configuration is incomplete. Latitude, longitude or radius is missing.';
                        } else if (geofenceBoundariesMapData && geofenceBoundariesMapData.state === 'not_configured') {
                            message = 'No geofence has been configured.';
                        }
                        mapContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-16 text-center"><svg class="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><p class="text-gray-700 dark:text-gray-300">${message}</p></div>`;
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching geofence boundary map data:', error);
                const mapContainer = document.getElementById('map');
                if (mapContainer) {
                    mapContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-16 text-center"><svg class="w-12 h-12 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><p class="text-gray-700 dark:text-gray-300">Unable to load geofence configuration. Please try again later.</p></div>`;
                }
            });

            // Handle modal close with close button
            document.querySelector('[data-modal-hide="student-location-modal"]').addEventListener('click', function () {
                studentLocationModal.hide();

                if (mapInstance) {
                    mapInstance.remove(); // Destroy the map and detach its listeners
                    mapInstance = null;
                }

                studentLocationModalContainer.innerHTML = ''; // Clear modal content
            });
        }
    });
}


}