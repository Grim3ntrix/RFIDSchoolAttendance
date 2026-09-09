import { DataTable } from "simple-datatables";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet.fullscreen/Control.FullScreen.css';
import { addBasemap } from '../map-basemap';
import { refreshIcons } from "../icons";

/* Shared table markup for both branches (with / without records). */
const studentLocationTable = `
    <div class="relative overflow-x-auto">
        <table id="studentLocationTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-4 py-3">Action</th>
                    <th scope="col" class="px-4 py-3">School ID</th>
                    <th scope="col" class="px-4 py-3">Full Name</th>
                    <th scope="col" class="px-4 py-3">Sex</th>
                    <th scope="col" class="px-4 py-3">Section</th>
                    <th scope="col" class="px-4 py-3">Grade/Yr. Level</th>
                    <th scope="col" class="px-4 py-3">User Status</th>
                    <th scope="col" class="px-4 py-3">Location Status</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>`;

const studentLocationEmptyState = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <i data-lucide="map-pin" class="h-6 w-6"></i>
        </span>
        <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No students to locate</h4>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Students from your assigned sections will appear here.</p>
    </div>`;

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
                document.getElementById('student-locations-datatable-container').innerHTML = studentLocationTable;
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

                        const buttonClass = userStatus === 'offline'
                            ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-primary-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400';
                        const row = document.createElement('tr');
                        row.className = 'border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50';
                        row.innerHTML = `
                            <td class="px-4 py-3">
                                <button type="button" ${userStatus === 'offline' ? 'disabled' : ''} data-modal-target="student-location-modal" data-modal-toggle="student-location-modal" data-student-id="${student.id}" title="View student location"
                                    class="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 ${buttonClass}">
                                    <span class="sr-only">View location of ${student.first_name} ${student.last_name}</span>
                                    <i data-lucide="locate-fixed" class="h-5 w-5"></i>
                                </button>
                            </td>
                            <td class="px-4 py-3">${student.school_id}</td>
                            <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.first_name} ${student.last_name} ${student.middle_name ?? ''} ${student.name_extension ?? ''}</td>
                            <td class="px-4 py-3">${student.sex}</td>
                            <td class="px-4 py-3">${sectionName}</td>
                            <td class="px-4 py-3">${gradeOrYearLevel}</td>
                            <td class="px-4 py-3">
                                <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">${userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}</span>
                            </td>
                            <td class="px-4 py-3">
                                <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">${studentLocationStatus.charAt(0).toUpperCase() + studentLocationStatus.slice(1)}</span>
                            </td>
                        `;
                        tbody.appendChild(row);
                    });
                });

                refreshIcons();

                new DataTable('#studentLocationTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none';
            } else {
                document.getElementById('student-locations-datatable-container').innerHTML = studentLocationEmptyState;
                refreshIcons();

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
                <div id="student-location-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-6 w-full max-w-4xl max-h-full">
                        <div class="relative bg-white rounded-xl shadow-lg dark:bg-gray-800">
                            <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="student-location-modal">
                                <span class="sr-only">Close modal</span>
                                <i data-lucide="x" class="h-4 w-4"></i>
                            </button>
                            <div class="p-6 text-center">
                                <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Student Location</h3>
                                <div id="map" class="w-full h-96 mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"></div> <!-- Map container -->
                                <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">Displaying the location of student, offered by <strong>RFID School Attendance</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>`;

            // Inject the modal into the container
            studentLocationModalContainer.innerHTML = modalHTML;
            refreshIcons();

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
                        mapContainer.innerHTML = `
                            <div class="flex flex-col items-center justify-center py-16 text-center">
                                <span class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                    <i data-lucide="map-pin" class="h-6 w-6"></i>
                                </span>
                                <p class="text-sm text-gray-700 dark:text-gray-300">${message}</p>
                            </div>`;
                        refreshIcons();
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching geofence boundary map data:', error);
                const mapContainer = document.getElementById('map');
                if (mapContainer) {
                    mapContainer.innerHTML = `
                        <div class="flex flex-col items-center justify-center py-16 text-center">
                            <span class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-600/10 dark:text-red-400">
                                <i data-lucide="alert-triangle" class="h-6 w-6"></i>
                            </span>
                            <p class="text-sm text-gray-700 dark:text-gray-300">Unable to load geofence configuration. Please try again later.</p>
                        </div>`;
                    refreshIcons();
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
