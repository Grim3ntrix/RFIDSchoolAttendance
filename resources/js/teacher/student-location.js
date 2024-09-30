import { DataTable } from "simple-datatables";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.js'; 
import 'leaflet.fullscreen/Control.FullScreen.css'; 

export function studentLocationPage() {
    console.log("Student location page function triggered.");

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
                                        Grade or Year Level
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

                        // Check if the student has any locations and their statuses
                        let studentLocationStatus = 'unavailable';
                        if (student.student_location.length > 0) {
                            // Get the most recent location status
                            const recentLocation = student.student_location[student.student_location.length - 1];
                            studentLocationStatus = recentLocation.student_location_status ? 
                                recentLocation.student_location_status.status : 'unknown'; // Set status or default to unknown
                        }

                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${student.school_id}</td>
                            <td>${student.first_name} ${student.last_name} ${student.middle_name ?? ''} ${student.name_extension ?? ''}</td>
                            <td>${student.sex}</td>
                            <td>${sectionName}</td>
                            <td>${gradeOrYearLevel}</td>
                            <td>${userStatus}</td>
                            <td>${studentLocationStatus}</td> <!-- Updated this line -->
                            <td>
                                <button type="button" data-modal-target="student-location-modal" data-modal-toggle="student-location-modal" class="text-blue-500 hover:underline" data-student-id="${student.id}">
                                    <svg class="w-7 h-6 text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </td>
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
                                        Grade or Year Level
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

    document.addEventListener('click', function (e) {
        if (e.target.closest('[data-modal-toggle="student-location-modal"]')) {
            e.preventDefault();

            studentId = e.target.closest('button').getAttribute('data-student-id');

            // Create modal HTML with map container
            const modalHTML = `
                <div id="student-location-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                    <div class="relative p-6 w-full max-w-4xl max-h-full">
                        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                            <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center" data-modal-hide="student-location-modal">
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
                
                if (geofenceBoundariesMapData) {
                    const latitude  = parseFloat(geofenceBoundariesMapData.latitude);
                    const longitude = parseFloat(geofenceBoundariesMapData.longitude);
                    const radius    = parseFloat(geofenceBoundariesMapData.radius);

                    // Initialize the Leaflet map centered at the given latitude and longitude
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

                        // Create a marker for the student's location
                        const studentMarker = L.marker([studentLat, studentLng])
                            .addTo(map);

                        // Check if the student is within the boundary
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
                }
            })
            .catch(error => {
                console.error('Error fetching geofence boundary map data:', error);
            });

            // Handle modal close with close button
            document.querySelector('[data-modal-hide="student-location-modal"]').addEventListener('click', function () {
                studentLocationModal.hide();
                studentLocationModalContainer.innerHTML = ''; // Clear modal content
            });
        }
    });
}


}