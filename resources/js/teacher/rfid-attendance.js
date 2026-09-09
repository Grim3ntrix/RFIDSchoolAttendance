import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { refreshIcons } from "../icons";

dayjs.extend(utc);
dayjs.extend(timezone);

/* Shared table markup for both branches (with / without records). */
const dailyAttendanceTable = `
    <div class="relative overflow-x-auto">
        <table id="dailyAttendanceTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-4 py-3">School ID</th>
                    <th scope="col" class="px-4 py-3">RFID Serial Number</th>
                    <th scope="col" class="px-4 py-3">Full Name</th>
                    <th scope="col" class="px-4 py-3">Section</th>
                    <th scope="col" class="px-4 py-3">Class Schedule</th>
                    <th scope="col" class="px-4 py-3">Status</th>
                    <th scope="col" class="px-4 py-3">Created</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>`;

const dailyAttendanceEmptyState = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <i data-lucide="scan-line" class="h-6 w-6"></i>
        </span>
        <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No attendance records yet</h4>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Today's attendance logs will appear here as students tap in.</p>
    </div>`;

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
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'dark:text-red-400', 'error-message');
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
                    document.getElementById('daily-attendance-table-container').innerHTML = dailyAttendanceTable;
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
                        'present': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                        'excuse': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                        'absent': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
                        'late': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
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
                        const badgeClass  = attendanceBadgeMap[attendance.attendance_status.status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'; // Default to gray if status is not found
                        const statusText  = attendance.attendance_status.status.charAt(0).toUpperCase() + attendance.attendance_status.status.slice(1);
                        const statusBadge = `<span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}">${statusText}</span>`;

                        row.className = 'border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50';
                        row.innerHTML = `
                            <td class="px-4 py-3">${student.school_id ?? 'N/A'}</td>
                            <td class="px-4 py-3">${student.rfid_serial_number}</td>
                            <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.first_name} ${student.middle_name ?? ''} ${student.last_name} ${student.name_extension ?? ''}</td>
                            <td class="px-4 py-3">${classSchedule.section.section_name}</td>
                            <td class="px-4 py-3">${classSchedule.subject} (${classSchedule.subject_code}) - (${startTime} - ${endTime})</td>
                            <td class="px-4 py-3">${statusBadge}</td>
                            <td class="px-4 py-3 whitespace-nowrap">${attendanceCreatedAt}</td>
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
                    document.getElementById('daily-attendance-table-container').innerHTML = dailyAttendanceEmptyState;
                    refreshIcons();

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
                <div class="flex justify-center">
                    <button id="toggleTableDailyAttendanceBtn" class="relative cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <i data-lucide="table-2" class="h-6 w-6"></i>
                        <span class="sr-only">Jump to today's attendance logs</span>
                        <span class="absolute -top-1 -end-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">${dailyAttendancesCount}</span>
                    </button>
                </div>`;
            separatorDailyAttendance.innerHTML = separatorDailyAttendanceHTML;
            refreshIcons();

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
                <div class="flex justify-center">
                    <button id="toggleTableAttendanceHistoryBtn" class="relative cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <i data-lucide="history" class="h-6 w-6"></i>
                        <span class="sr-only">Jump to review previous attendances</span>
                    </button>
                </div>`;
            separatorAttendanceHistory.innerHTML = separatorAttendanceHistoryHTML;
            refreshIcons();

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
