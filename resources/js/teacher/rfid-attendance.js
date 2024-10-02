import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';

export function rfidAttendance() {
    // console.log("Attendance page function triggered.");

    // Display current time and date
    setInterval(function () {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const dateString = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        document.getElementById('current-time').textContent = timeString;
        document.getElementById('current-date').textContent = dateString;
    }, 1000);

    const sectionElement       = document.getElementById('section');
    const classScheduleElement = document.getElementById('class_schedule');

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

        // Fetch sections data from API
        axios.get(`/teacher/sections-record`)
        .then(response => {
            const sectionsData = response.data;

            sectionsData.forEach(sectionData => {
                const option = document.createElement('option');
                option.value = sectionData.id;
                option.textContent = sectionData.section_name;
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

                    // Day abbreviation mapping
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
                        'excused': 'bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300',
                        'absent': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-500',
                        'late': 'bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-red-400',
                    };
                    
                    dailyAttendances.forEach(attendance => {
                        const row = document.createElement('tr');

                        // Get student and class schedule details
                        const student = attendance.student;
                        const classSchedule = attendance.class_schedule;
                        
                        // Format start and end times to AM/PM
                        const startTime = convertToAmPm(classSchedule.start_time);
                        const endTime = convertToAmPm(classSchedule.end_time);
                        
                        // Create badge for attendance status
                        const badgeClass = attendanceBadgeMap[attendance.attendance_status.status] || 'bg-gray-100 text-gray-800'; // Default to gray if status is not found
                        const statusBadge = `<span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}">${attendance.attendance_status.status}</span>`;

                        // Create table row
                        row.innerHTML = `
                            <td>${student.school_id ?? 'N/A'}</td>
                            <td>${student.rfid_serial_number}</td>
                            <td>${student.first_name} ${student.last_name}</td>
                            <td>${classSchedule.section.section_name}</td>
                            <td>${classSchedule.subject} (${classSchedule.subject_code}) - (${startTime} - ${endTime})</td>
                            <td>${statusBadge}</td> <!-- Updated to include the badge -->
                            <td>${convertToAmPm(attendance.created_at)}</td>
                        `;
                        
                        // Append the row to the table body
                        tbody.appendChild(row);
                    });

                    new DataTable('#dailyAttendanceTable', {
                        searchable: true,
                        fixedHeight: true,
                        sortable: true,
                        perPage: 5,
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
                        perPage: 5,
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
    const separator = document.getElementById('separator');

    axios.get(`/teacher/students/daily-attendances/counts`)
    .then(response => {
        const dailyAttendancesCount = response.data;

        if (separator) {
            const separatorHTML = `
                <div class="flex justify-center mb-6">
                    <button id="toggleTableBtn" class="relative text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2" d="M3 11h18m-9 0v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                        </svg>
                        <span class="sr-only">Toggle Attendance Table</span>
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        ${dailyAttendancesCount}
                        </div>
                    </button>
                </div>`;
            separator.innerHTML = separatorHTML;

            // Add event listener to scroll to the table when the button is clicked
            const toggleTableBtn = document.getElementById('toggleTableBtn');
            toggleTableBtn.addEventListener('click', () => {
                const table = document.getElementById('dailyAttendanceTable');
                if (table) {
                    table.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    })
                
    .catch(error => {
        console.error('Error fetching daily attendances count:', error);
    });
}
