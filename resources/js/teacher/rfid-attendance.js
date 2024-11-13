import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function rfidAttendance() {
    // console.log("Attendance page function triggered.");

    setInterval(function () {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const dateString = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        document.getElementById('current-time').textContent = timeString;
        document.getElementById('current-date').textContent = dateString;
    }, 1000);

    const sectionElement       = document.getElementById('section');
    const classScheduleElement = document.getElementById('class_schedule');
    const rfidScanElement      = document.getElementById('rfid_serial_number');
    const viewAttendanceHistoryModal      = document.getElementById('view-attendance-history-modal');
    
    // Only focus if the page is focused
    if (document.hasFocus()) {
        rfidScanElement.focus();
    }

    // Function to check if the target is within an SVG
    function isWithinSvg(element) {
        return element.closest('svg') !== null;  // Check if the closest ancestor is an SVG
    }

    document.addEventListener('click', function(event) {
        // Ensure page is focused before trying to refocus
        if (!document.hasFocus()) return;

        const target = event.target;
        // console.log(target.tagName); // Debugging: Log the clicked element’s tag
        const interactiveElements = ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT', 'SPAN'];

        // Check if the clicked element is interactive or is within an SVG
        if (!interactiveElements.includes(target.tagName) && 
            !isWithinSvg(target)) {
            rfidScanElement.focus(); // Refocus if not interacting with an interactive element or SVG
        }
    });

    // Restore saved selections from sessionStorage
    const savedSection       = sessionStorage.getItem('selectedSection');
    const savedClassSchedule = sessionStorage.getItem('selectedClassSchedule');

    // Save selections to sessionStorage when a change occurs
    sectionElement.addEventListener('change', function() {
        sessionStorage.setItem('selectedSection', sectionElement.value);
    });

    classScheduleElement.addEventListener('change', function() {
        sessionStorage.setItem('selectedClassSchedule', classScheduleElement.value);
    });

    /* Axios GET request to populate the section */

    if (sectionElement) {
        sectionElement.innerHTML = '';
        const defaultSectionOption = document.createElement('option');
        defaultSectionOption.value = '';
        defaultSectionOption.textContent = 'Select a Section';
        defaultSectionOption.disabled = true;
        defaultSectionOption.selected = true;
        sectionElement.appendChild(defaultSectionOption); 

        axios.get(`/teacher/sections-record`)
        .then(response => {
            const sectionsData = response.data;

            sectionsData.forEach(sectionData => {
                const option = document.createElement('option');
                option.value = sectionData.id;
                option.textContent = `${sectionData.section_name}-${sectionData.grade_or_year_level}`;
                sectionElement.appendChild(option);
            });

            // After populating, restore the saved section value
            if (savedSection) {
                sectionElement.value = savedSection;
                // Trigger the change event to reload the class schedule for the selected section
                sectionElement.dispatchEvent(new Event('change'));
            }
        })
        .catch(error => {
            console.error('Error fetching sections:', error);
        });

        sectionElement.addEventListener('change', function() {
            const selectedSectionId = this.value;
            classScheduleElement.innerHTML = '';

            const defaultClassScheduleOption = document.createElement('option');
            defaultClassScheduleOption.value = '';
            defaultClassScheduleOption.textContent = 'Select a Class Schedule';
            defaultClassScheduleOption.disabled = true;
            defaultClassScheduleOption.selected = true;
            classScheduleElement.appendChild(defaultClassScheduleOption);

            if (selectedSectionId) {
                axios.get(`/teacher/class-schedules/${selectedSectionId}`)
                .then(response => {
                    const dailyAttendancesData = response.data;

                    function convertToAmPm(time) {
                        const [hours, minutes] = time.split(':');
                        const suffix = hours >= 12 ? 'PM' : 'AM';
                        const adjustedHours = hours % 12 || 12; // 12-hour format
                        return `${adjustedHours}:${minutes} ${suffix}`;
                    }

                    const dayAbbreviations = {
                        "Monday":   "M",
                        "Tuesday":  "T",
                        "Wednesday":"Wed",
                        "Thursday": "Th",
                        "Friday":   "F",
                        "Saturday": "Sat",
                        "Sunday":   "Sun"
                    };

                    function getAbbreviatedDays(daysOfWeek) {
                        return daysOfWeek.map(day => dayAbbreviations[day.day_name]).join('');
                    }
                    
                    dailyAttendancesData.forEach(scheduleData => {
                        const option = document.createElement('option');
                        option.value = scheduleData.id;

                        const formattedStartTime = convertToAmPm(scheduleData.start_time);
                        const formattedEndTime   = convertToAmPm(scheduleData.end_time);

                        const abbreviatedDays = getAbbreviatedDays(scheduleData.days_of_week);

                        option.textContent = `${scheduleData.subject} (${scheduleData.subject_code}) - ${abbreviatedDays} (${formattedStartTime} - ${formattedEndTime})`;
                        classScheduleElement.appendChild(option);
                    });

                    // After populating, restore the saved class schedule value
                    if (savedClassSchedule) {
                        classScheduleElement.value = savedClassSchedule;
                    }
                })
                .catch(error => {
                    console.error('Error fetching class schedules:', error);
                });
            }
        });
    }

    /* Submit Attendance Form */

    const form = document.getElementById('rfid-attendance-form');

    if (form){
        form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        let formData = new FormData(form);

        axios.post(`/teacher/rfid-attendances`, formData)
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
                    title: "Attendance record added successfully!"
                });
            
                form.reset();
                window.location.href = `/teacher/rfid-attendances`;
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {

                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation

                    for (let key in errors) {
                        let inputElement = document.getElementById(key);

                        // In case no matching input is found, continue to the next error
                        if (!inputElement) {
                            continue;
                        }

                        let errorMessage = errors[key];

                        let errorElement = document.createElement('p');
                        errorElement.classList.add('text-red-500', 'text-xs', 'mt-1', 'error-message');
                        errorElement.innerText = errorMessage;

                        inputElement.after(errorElement); // Insert error message after the input field
                    }
                }
            });
        });
    }

    const attendanceTableContainer = document.getElementById('daily-attendance-table-container');

    if (attendanceTableContainer) {

        const tableLoader = document.getElementById('table-loader');

        if (tableLoader) {
            tableLoader.style.display = 'flex';

            /* Axios GET request to populate the datatable */

            axios.get(`/teacher/students/daily-attendances`)
            .then(response => {
                const dailyAttendances = response.data;

                /* Datatable */

                if (dailyAttendances.length > 0) {
                    const tableHTML = `
                    <table id="dailyAttendanceTable" class="bg-gray-50 dark:bg-gray-800">
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
                                        Class Schedule
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
                                        Created
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                    </table>`;

                    document.getElementById('daily-attendance-table-container').innerHTML = tableHTML;
                    const tbody = document.querySelector('#dailyAttendanceTable tbody');
                    tbody.innerHTML = '';

                    function convertToAmPm(time) {
                        const [hours, minutes] = time.split(':');
                        const suffix = hours >= 12 ? 'PM' : 'AM';
                        const adjustedHours = hours % 12 || 12; // Adjust hours to 12-hour format
                        return `${adjustedHours}:${minutes} ${suffix}`;
                    }

                    // Map attendance statuses to specific badge color classes
                    const attendanceBadgeMap = {
                        'present': 'bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400',
                        'excuse': 'bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300',
                        'absent': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-500',
                        'late': 'bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-red-400',
                    };

                    function convertToAsiaManilaTime(datetime) {
                        return dayjs(datetime).tz('Asia/Manila').format('h:mm A'); // Convert to Asia/Manila and format to 12-hour
                    }
                    
                    dailyAttendances.forEach(attendance => {
                        const row = document.createElement('tr');

                        const student       = attendance.student;
                        const classSchedule = attendance.class_schedule;
                        const attendanceCreatedAt = convertToAsiaManilaTime(attendance.created_at);
                        
                        const startTime = convertToAmPm(classSchedule.start_time);
                        const endTime   = convertToAmPm(classSchedule.end_time);

                        // Create badge for attendance status
                        const badgeClass  = attendanceBadgeMap[attendance.attendance_status.status] || 'bg-gray-100 text-gray-800'; // Default to gray if status is not found
                        const statusBadge = `<span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}">${attendance.attendance_status.status}</span>`;

                        row.innerHTML = `
                            <td>${student.school_id ?? 'N/A'}</td>
                            <td>${student.rfid_serial_number}</td>
                            <td>${student.first_name} ${student.middle_name ?? ''} ${student.last_name} ${student.name_extension ?? ''}</td>
                            <td>${classSchedule.section.section_name}</td>
                            <td>${classSchedule.subject} (${classSchedule.subject_code}) - (${startTime} - ${endTime})</td>
                            <td>${statusBadge}</td> <!-- Updated to include the badge -->
                            <td>${attendanceCreatedAt}</td>
                        `;
                        
                        tbody.appendChild(row);
                    });

                    new DataTable('#dailyAttendanceTable', {
                        searchable: true,
                        fixedHeight: true,
                        sortable: true,
                        perPage: 10,
                    });

                    document.getElementById('table-loader').style.display = 'none';

                } else {
                    const tableHTML = `
                        <table id="dailyAttendanceTable" class="bg-gray-50 dark:bg-gray-800">
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
                                        Class Schedule
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
                                        Created
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                    </table>`;

                    document.getElementById('daily-attendance-table-container').innerHTML = tableHTML;
                    const tbody = document.querySelector('#dailyAttendanceTable tbody');
                    tbody.innerHTML = '';

                    new DataTable('#dailyAttendanceTable', {
                        searchable: true,
                        fixedHeight: true,
                        sortable: true,
                        perPage: 10,
                    });

                    document.getElementById('table-loader').style.display = 'none';
                }
            })
                
            .catch(error => {
                console.error('Error fetching daily attendances data:', error);
                document.getElementById('table-loader').style.display = 'none';
            });
        }
    }

    // Toggle Datatable Hide/Show
    const separatorDailyAttendance = document.getElementById('separator-daily-attendance');
    const separatorAttendanceHistory = document.getElementById('separator-attendance-history');

    axios.get(`/teacher/students/daily-attendances/counts`)
    .then(response => {
        const dailyAttendancesCount = response.data;

        if (separatorDailyAttendance) {
            const separatorDailyAttendanceHTML = `
                <div class="flex justify-center mb-6">
                    <button id="toggleTableDailyAttendanceBtn" class="relative text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2" d="M3 11h18m-9 0v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                        </svg>
                        <span class="sr-only">Toggle Attendance Table</span>
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        ${dailyAttendancesCount}
                        </div>
                    </button>
                </div>`;
            separatorDailyAttendance.innerHTML = separatorDailyAttendanceHTML;

            // Add event listener to scroll to the table when the button is clicked
            const toggleTableDailyAttendanceBtn = document.getElementById('toggleTableDailyAttendanceBtn');
            toggleTableDailyAttendanceBtn.addEventListener('click', () => {
                const table = document.getElementById('toggle-daily-attendance-content');
                if (table) {
                    table.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        if (separatorAttendanceHistory) {
            const separatorAttendanceHistoryHTML = `
                <button id="toggleTableAttendanceHistoryBtn" class="relative cursor-pointer">
                    <svg class="w-7 h-7 flex-shrink-0 text-gray-800 dark:text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8V12L14.5 14.5"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.2" d="M5.60414 5.60414L5.07381 5.07381V5.07381L5.60414 5.60414ZM4.33776 6.87052L3.58777 6.87429C3.58984 7.28556 3.92272 7.61844 4.33399 7.62051L4.33776 6.87052ZM6.87954 7.6333C7.29375 7.63539 7.63122 7.30129 7.6333 6.88708C7.63538 6.47287 7.30129 6.1354 6.88708 6.13332L6.87954 7.6333ZM5.07496 4.3212C5.07288 3.90699 4.73541 3.5729 4.3212 3.57498C3.90699 3.57706 3.5729 3.91453 3.57498 4.32874L5.07496 4.3212ZM3.82661 10.7849C3.88286 10.3745 3.59578 9.99627 3.1854 9.94002C2.77503 9.88377 2.39675 10.1708 2.3405 10.5812L3.82661 10.7849ZM18.8622 5.13777C15.042 1.31758 8.86873 1.27889 5.07381 5.07381L6.13447 6.13447C9.33358 2.93536 14.5571 2.95395 17.8016 6.19843L18.8622 5.13777ZM5.13777 18.8622C8.95796 22.6824 15.1313 22.7211 18.9262 18.9262L17.8655 17.8655C14.6664 21.0646 9.44291 21.0461 6.19843 17.8016L5.13777 18.8622ZM18.9262 18.9262C22.7211 15.1313 22.6824 8.95796 18.8622 5.13777L17.8016 6.19843C21.0461 9.44291 21.0646 14.6664 17.8655 17.8655L18.9262 18.9262ZM5.07381 5.07381L3.80743 6.34019L4.86809 7.40085L6.13447 6.13447L5.07381 5.07381ZM4.33399 7.62051L6.87954 7.6333L6.88708 6.13332L4.34153 6.12053L4.33399 7.62051ZM5.08775 6.86675L5.07496 4.3212L3.57498 4.32874L3.58777 6.87429L5.08775 6.86675ZM2.3405 10.5812C1.93907 13.5099 2.87392 16.5984 5.13777 18.8622L6.19843 17.8016C4.27785 15.881 3.48663 13.2652 3.82661 10.7849L2.3405 10.5812Z" fill="currentColor"></path>
                    </svg>
                    <svg class="w-6 h-6 text-white p-1 dark:text-white absolute -top-4 -end-0 transform translate-x-2 translate-y-2 bg-red-500 border-2 border-white rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"/>
                        <path fill-rule="evenodd" d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z" clip-rule="evenodd"/>
                    </svg>      
                </button>`;
            separatorAttendanceHistory.innerHTML = separatorAttendanceHistoryHTML;
    
            // Add event listener to scroll to the table when the button is clicked
            const toggleTableBtn = document.getElementById('toggleTableAttendanceHistoryBtn');
            toggleTableBtn.addEventListener('click', () => {
                const table = document.getElementById('toggle-attendance-history-content');
                if (table) {
                    table.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    })      
}
