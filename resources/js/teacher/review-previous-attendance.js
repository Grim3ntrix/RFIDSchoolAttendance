// Import necessary modules
import { DataTable } from "simple-datatables";
import { Calendar } from '@fullcalendar/core'
import multiMonthPlugin from '@fullcalendar/multimonth'
import axios from "axios";

// Declare globally accessible variables
let selectedSectionId = null;
let selectedClassScheduleId = null;

export function reviewPreviousAttendance() {
    console.log('Review Previous Attendance Page');

    const sectionEl = document.getElementById('section_to_review_prev_att');
    const classScheduleEl = document.getElementById('class_schedule_to_review_prev_att');

    // Populate sections dropdown
    if (sectionEl) {
        sectionEl.innerHTML = '';
        const defaultSectionOption = document.createElement('option');
        defaultSectionOption.value = '';
        defaultSectionOption.textContent = 'Select a Section';
        defaultSectionOption.disabled = true;
        defaultSectionOption.selected = true;
        sectionEl.appendChild(defaultSectionOption); 

        axios.get(`/teacher/sections-record`)
        .then(response => {
            const sectionsData = response.data;
            sectionsData.forEach(sectionData => {
                const option = document.createElement('option');
                option.value = sectionData.id;
                option.textContent = `${sectionData.section_name}-${sectionData.grade_or_year_level}`;
                sectionEl.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching sections:', error));
    }

    // Track changes to selected section and populate class schedules
    sectionEl.addEventListener('change', function() {
        selectedSectionId = this.value; // Update global variable
        console.log('Selected Section ID:', selectedSectionId); // Log updated section ID

        classScheduleEl.innerHTML = '';

        const defaultClassScheduleOption = document.createElement('option');
        defaultClassScheduleOption.value = '';
        defaultClassScheduleOption.textContent = 'Select a Class Schedule';
        defaultClassScheduleOption.disabled = true;
        defaultClassScheduleOption.selected = true;
        classScheduleEl.appendChild(defaultClassScheduleOption);

        if (selectedSectionId) {
            axios.get(`/teacher/class-schedules/${selectedSectionId}`)
            .then(response => {
                const studentsData = response.data;

                // Helper functions for formatting
                function convertToAmPm(time) {
                    const [hours, minutes] = time.split(':');
                    const suffix = hours >= 12 ? 'PM' : 'AM';
                    const adjustedHours = hours % 12 || 12;
                    return `${adjustedHours}:${minutes} ${suffix}`;
                }
                function getAbbreviatedDays(daysOfWeek) {
                    const dayAbbreviations = {
                        "Monday": "M", "Tuesday": "T", "Wednesday": "Wed",
                        "Thursday": "Th", "Friday": "F", "Saturday": "Sat", "Sunday": "Sun"
                    };
                    return daysOfWeek.map(day => dayAbbreviations[day.day_name]).join('');
                }
                
                studentsData.forEach(scheduleData => {
                    const option = document.createElement('option');
                    option.value = scheduleData.id;

                    const formattedStartTime = convertToAmPm(scheduleData.start_time);
                    const formattedEndTime = convertToAmPm(scheduleData.end_time);
                    const abbreviatedDays = getAbbreviatedDays(scheduleData.days_of_week);

                    option.textContent = `${scheduleData.subject} (${scheduleData.subject_code}) - ${abbreviatedDays} (${formattedStartTime} - ${formattedEndTime})`;
                    classScheduleEl.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching class schedules:', error));
        }
    });

    // Track changes to selected class schedule
    classScheduleEl.addEventListener('change', function() {
        selectedClassScheduleId = this.value; // Update global variable
        console.log('Selected Class Schedule ID:', selectedClassScheduleId); // Log updated class schedule ID

        if (selectedSectionId && selectedClassScheduleId) {
            getStudentBySection(selectedSectionId, selectedClassScheduleId);
        }
    });
}

function getStudentBySection(selectedSectionId, selectedClassScheduleId) {
    console.log("Fetching students for Section ID:", selectedSectionId, "and Class Schedule ID:", selectedClassScheduleId);
    
    if (selectedSectionId && selectedClassScheduleId) {

        axios.post('/teacher/students-by-section', {
            section_id: selectedSectionId,
        })
        .then(response => {
            const students = response.data.studentsBySection;
            
            /* Datatable */

            if (students.length > 0) {
                const tableHTML = `
                <table id="studentsBySectionTable" class="bg-gray-50 dark:bg-gray-800">
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
                                    RFID Serial Number
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
                                    Section
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

                document.getElementById('review-previous-attendances-table-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#studentsBySectionTable tbody');
                tbody.innerHTML = '';
                
                students.forEach(student => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${student.school_id ?? 'N/A'}</td>
                        <td>${student.rfid_serial_number}</td>
                        <td>${student.first_name} ${student.middle_name ?? ''} ${student.last_name} ${student.name_extension ?? ''}</td>
                        <td>${student.section.section_name}</td>
                        <td>
                            <button type="button" data-modal-target="view-attendance-history-modal" data-modal-toggle="view-attendance-history-modal" class="flex items-center text-gray-700 hover:text-indigo-600 transition-colors duration-150" data-student-id="${student.id}">
                                <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 8V12L14.5 14.5"></path>
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                                <span>View</span>
                            </button>
                        </td>
                    `;
                    
                    tbody.appendChild(row);
                });

                // Solution: Event Delegation, to pass the data from the button data-attribute and pass it into another function
                tbody.addEventListener('click', function(event) {
                    const button = event.target.closest('button[data-student-id]');
                    if (button) {
                        // Get the class schedule ID from the button's data attribute
                        const studentId = button.getAttribute('data-student-id');
                        // Pass it to the actions function
                        actions(studentId, selectedClassScheduleId);
                    }
                });

                new DataTable('#studentsBySectionTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 10,
                });

            } else {
                const tableHTML = `
                    <table id="studentsBySectionTable" class="bg-gray-50 dark:bg-gray-800">
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
                                    RFID Serial Number
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
                                    Section
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                        </tr><th>
                                <span class="flex items-center">
                                    Action
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                    </thead>
                <tbody></tbody>
                </table>`;

                document.getElementById('daily-attendance-table-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#studentsBySectionTable tbody');
                tbody.innerHTML = '';

                new DataTable('#studentsBySectionTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 10,
                });
            }
        })
        .catch(error => console.error('Error fetching students attendances based on class schedule:', error));
    }
}

function actions(studentId, selectedClassScheduleId) {
    console.log('studentId from action:', studentId);
    console.log('selectedClassScheduleId from action:', selectedClassScheduleId);

    // Show the modal with a loading indicator
    viewAttendanceHistoryModal(null); // Passing null initially to indicate "loading"

    axios.post(`/teacher/review-student-attendance-by-class-schedule`, {
        student_id: studentId,
        class_schedule_id: selectedClassScheduleId,
    })
    .then(response => {
        const attendancesByClassSchedule = response.data.attendances;
        // Now update the modal with actual attendance data
        viewAttendanceHistoryModal(attendancesByClassSchedule);
    })
    .catch(error => console.error('Error fetching class schedules:', error));
}

function viewAttendanceHistoryModal(attendancesByClassSchedule) {
    const viewAttendanceHistoryModalContainer = document.getElementById('view-attendance-history-modal-container');

    // Placeholder content for loading
    let modalContent = attendancesByClassSchedule 
    ? `<!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <!-- Legend Section -->
            <div>
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Legend</h2>
                <div class="flex flex-wrap justify-center space-x-4 mt-4">
                    <div class="flex items-center space-x-2">
                        <span class="w-6 h-6 flex items-center justify-center text-white rounded-sm bg-blue-500">P</span>
                        <span class="text-gray-800 dark:text-gray-300">Present</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="w-6 h-6 flex items-center justify-center text-white rounded-sm bg-red-600">L</span>
                        <span class="text-gray-800 dark:text-gray-300">Late</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="w-6 h-6 flex items-center justify-center text-white rounded-sm bg-gray-500">A</span>
                        <span class="text-gray-800 dark:text-gray-300">Absent</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="w-6 h-6 flex items-center justify-center text-white rounded-sm bg-yellow-400">E</span>
                        <span class="text-gray-800 dark:text-gray-300">Excused</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Section -->
        <div id="attendance-history-container" class="mt-8">
            <!-- Insert Content Here -->
        </div>` // Replace with actual data content structure
    : `<p>Loading attendance history...</p>`;

    const viewAttendanceHistoryModal = `
        <div id="view-attendance-history-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full">
            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Attendance History
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="view-attendance-history-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                    <div class="p-4 md:p-5 space-y-4 overflow-y-auto" style="max-height: 80vh;">
                        ${modalContent}
                    </div>
                </div>
            </div>
        </div>
    `;

    viewAttendanceHistoryModalContainer.innerHTML = viewAttendanceHistoryModal;

    const viewAttendanceHistoryModalEl = document.getElementById('view-attendance-history-modal');
    const modalInstance = new Modal(viewAttendanceHistoryModalEl);
    modalInstance.show();

    document.querySelector('[data-modal-hide="view-attendance-history-modal"]').addEventListener('click', function () {
        modalInstance.hide();
        viewAttendanceHistoryModalContainer.innerHTML = ''; // Clear modal content
    });

    const calendarEl = document.getElementById('attendance-history-container');

    if (calendarEl) {
        const attendanceEvents = attendancesByClassSchedule.map(attendance => {
            const color = getStatusColor(attendance.attendance_status.status);
            const statusAbbreviation = statusTitle(attendance.attendance_status.status);
            
            return {
                title: statusAbbreviation, // Set title according to attendance status
                start: attendance.created_at,
                backgroundColor: color,    // Apply background color based on status
                borderColor: "transparent",
            };
        });

        const calendar = new Calendar(calendarEl, {
            plugins: [multiMonthPlugin],
            initialView: 'multiMonthYear',
            events: attendanceEvents,

            eventDidMount: function(info) {
                // Apply multiple inline styles
                Object.assign(info.el.style, {
                    backgroundColor: info.event.backgroundColor,
                    fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
                    color: "#f0f0f9"
                });

                // Hide the time component for cleaner presentation
                const timeElement = info.el.querySelector('.fc-event-time');
                if (timeElement) {
                    timeElement.style.display = 'none';
                }
            },
        });

        calendar.render();
    }
}

// Helper function to set color based on attendance status
function getStatusColor(status) {
    switch(status) {
        case 'present':
            return '#3B82F6'; // Blue for present
        case 'late':
            return '#DC2626'; // Red for late
        case 'absent':
            return '#6B7280'; // Gray for absent
        case 'excuse':
            return '#FBBF24'; // Yellow for excuse
        default:
            return '#9CA3AF'; // Default gray
    }
}

//Helper function to set title based on attendance status
function statusTitle(status) {
    switch (status) {
        case 'present':
            return 'P'; // Abbreviation for Present
        case 'late':
            return 'L'; // Abbreviation for Late
        case 'absent':
            return 'A'; // Abbreviation for Absent
        case 'excuse':
            return 'E'; // Abbreviation for Excuse
        default:
            return 'N/A'; // Default abbreviation for unknown statuses
    }
}
