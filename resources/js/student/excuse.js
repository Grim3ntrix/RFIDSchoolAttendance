import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';

dayjs.extend(utc);
dayjs.extend(timezone);

export function studentExcuse() {
    // console.log("Student excuse page function triggered.");

    const studentExcuseRequestContainer = document.getElementById('student-excuse-request-container');
    
    if (studentExcuseRequestContainer) {
        composeExcuseRequestBtn();
        classScheduleJsonRequest();
        ExcuseRequestDatatable();
        // excuseMessageModal();
    }
    
}

function composeExcuseRequestBtn()
{
    /* Compose Excuse Modal Form */
    const form = document.getElementById('excuse-request-form');

    if (form) {
        form.addEventListener('submit', function (e) {
        e.preventDefault();

        let formData = new FormData(form);

        axios.post(`/student/excuses`, formData)
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
                    title: "Excuse requested successfully!"
                });

                form.reset();
                window.location.href = `/student/excuses`;
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove());

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
}

function classScheduleJsonRequest() {
    /* Get Class Schedule By Student data */

    axios.get(`/student/get-class-schedule-by-student`)
    .then(response => {
        const classScheduleByStudent = response.data;

        // Clear out any existing options before populating
        const selectElement = document.getElementById('class_schedule');
        const sectionElement = document.getElementById('section');
        const recipientElement = document.getElementById('recipient');
        selectElement.innerHTML = '';  // Clear previous options
        sectionElement.value = '';  // Clear section field
        recipientElement.value = '';  // Clear recipient field

        // Add a default disabled option for the select dropdown
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Select Class Schedule';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        function convertToAmPm(time) {
            const [hours, minutes] = time.split(':');
            const suffix = hours >= 12 ? 'PM' : 'AM';
            const adjustedHours = hours % 12 || 12; // Adjust hours to 12-hour format
            return `${adjustedHours}:${minutes} ${suffix}`;
        }

        if (classScheduleByStudent.length > 0) {
            classScheduleByStudent.forEach(classSchedule => {
                const startTime = convertToAmPm(classSchedule.start_time);
                const endTime = convertToAmPm(classSchedule.end_time);

                const classScheduleData = `${classSchedule.subject} (${classSchedule.subject_code}) - ${startTime}-${endTime}`;

                const option = document.createElement('option');
                option.value = classSchedule.id;
                option.text = classScheduleData;

                // Append each class schedule option
                selectElement.appendChild(option);

                // Auto-fill section and recipient fields with the first class schedule's data
                if (classScheduleByStudent.length === 1) {
                    sectionElement.value = `${classSchedule.section.section_name} (${classSchedule.section.grade_or_year_level})`;
                    recipientElement.value = `${classSchedule.teacher.first_name ?? 'N/A'} ${classSchedule.teacher.middle_name ?? 'N/A'} ${classSchedule.teacher.last_name ?? 'N/A'} ${classSchedule.teacher.name_extenion ?? 'N/A'}`;
                }
            });

            // Add event listener to update fields when a class schedule is selected
            selectElement.addEventListener('change', (event) => {
                const selectedClassSchedule = classScheduleByStudent.find(classSchedule => classSchedule.id == event.target.value);

                if (selectedClassSchedule) {
                    sectionElement.value = `${selectedClassSchedule.section.section_name} (${selectedClassSchedule.section.grade_or_year_level})`;
                    recipientElement.value = `${selectedClassSchedule.teacher.first_name ?? 'N/A'} ${selectedClassSchedule.teacher.middle_name ?? 'N/A'} ${selectedClassSchedule.teacher.last_name ?? 'N/A'} ${selectedClassSchedule.teacher.name_extenion ?? 'N/A'}`;
                }
            });
        }
    })
    .catch(error => {
        console.error("Error fetching class schedule by student:", error);
    });
}

function ExcuseRequestDatatable()
{
    /* Get Class Schedules with Days of Weeks (eager loaded) for a specific section */

    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get(`/student/get-excuse-request-by-student`)
        .then(response => {
            const excuseRequestByStudent = response.data.excuseRequest;

            /* Datatable */

            if (excuseRequestByStudent.length > 0) {
                const tableHTML = `
                <table id="excuseRequestByStudentTable" class="bg-gray-50 dark:bg-gray-800">
                    <thead>
                        <tr>
                            <th>
                                <span class="flex items-center">
                                    Msg.
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Grade/Yr. & Section
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
                                    From
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                   To
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Proof (Link)
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

                document.getElementById('student-excuse-request-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#excuseRequestByStudentTable tbody');
                tbody.innerHTML = '';

                function convertToAmPm(time) {
                    const [hours, minutes] = time.split(':');
                    const suffix = hours >= 12 ? 'PM' : 'AM';
                    const adjustedHours = hours % 12 || 12; // Adjust hours to 12-hour format
                    return `${adjustedHours}:${minutes} ${suffix}`;
                }

                function convertToAsiaManilaTime(datetime) {
                    return dayjs(datetime).tz('Asia/Manila').format('MMM-DD-YYYY h:mm A'); // Convert to Asia/Manila and format to 12-hour
                }

                excuseRequestByStudent.forEach(excuseRequest => {
                    const row = document.createElement('tr');
                
                    const attendanceCreatedAt = convertToAsiaManilaTime(excuseRequest.created_at);
                    
                    // Destructure data safely
                    const { excuse_request_status: excuseRequestStatusData, student: studentData, class_schedule: classScheduleData, proof } = excuseRequest;
                    const { section: sectionData } = studentData || {};
                    const { teacher: teacherData = {} } = classScheduleData || {}; // Provide an empty object as fallback
                    const daysOfWeekData = classScheduleData?.days_of_week || [];
                
                    const teacherUserData = teacherData?.user || {}; // Destructure user from teacher data
                     
                    // Convert start and end time to AM/PM format
                    const startTime = convertToAmPm(classScheduleData?.start_time);
                    const endTime = convertToAmPm(classScheduleData?.end_time);
                    
                    // Handle teacher full name, prioritizing teacher data, falling back to user data
                    const teacherFullName = 
                        `${teacherData.first_name ?? teacherUserData.name ?? 'Unknown Teacher'} ${teacherData.middle_name ?? ''} ${teacherData.last_name ?? ''} ${teacherData.name_extension ?? ''}`.trim();
                
                    // Ensure student data exists before accessing properties
                    const studentFullName = `${studentData.first_name ?? ''} ${studentData.middle_name ?? ''} ${studentData.last_name ?? ''} ${studentData.name_extension ?? ''}`.trim();
                    
                    // Days of the week handling
                    const days = daysOfWeekData.map(day => day.day_name).join(', ');
                
                    // Populate the table row
                    row.innerHTML = `
                        <td class="text-center">
                            <div class="flex justify-center">
                                <button type="button" data-modal-target="excuse-request-message-modal" data-modal-toggle="excuse-request-message-modal" class="text-blue-500 hover:underline" data-excuse-request-message-id="${excuseRequest.id}">
                                    <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                        <td>${sectionData?.grade_or_year_level ?? 'N/A'}-${sectionData?.section_name ?? 'N/A'}</td>
                        <td>${classScheduleData?.subject ?? 'No Subject'} (${classScheduleData?.subject_code ?? ''}) - ${startTime ?? 'N/A'}-${endTime ?? 'N/A'} (${days || 'No Days'})</td>
                        <td>${studentFullName}</td>
                        <td>${teacherFullName || 'Personal details not yet updated by the teacher'}</td>
                        <td>
                            ${proof 
                            ? `<a href="${proof.startsWith('http://') || proof.startsWith('https://') ? proof : 'https://' + proof}" target="_blank" class="text-blue-500 hover:text-blue-700 underline">
                                View Proof
                            </a>`
                            : 'No proof'}
                        </td>
                        <td>${excuseRequestStatusData?.status ?? 'No Status'}</td>
                        <td>${attendanceCreatedAt}</td>
                        <td class="text-center">
                            <div class="flex justify-center">
                                <button type="button" data-modal-target="delete-excuse-message-request-modal" data-modal-toggle="delete-excuse-message-request-modal" class="text-red-500 hover:underline" data-excuse-request-message-id="${excuseRequest.id}">
                                    <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    `;
                
                    // Append the row to tbody for each excuse request
                    tbody.appendChild(row);
                });
                
                // Initialize DataTable with proper options
                new DataTable('#excuseRequestByStudentTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });
                
                // Hide the loader after rendering the table
                document.getElementById('table-loader').style.display = 'none';

            } else {
                const tableHTML = `
                    <table id="excuseRequestByStudentTable" class="bg-gray-50 dark:bg-gray-800">
                    <thead>
                        <tr>
                            <th>
                                <span class="flex items-center">
                                    Msg.
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Grade/Yr. & Section
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
                                    From
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                   To
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Proof (Link)
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

                document.getElementById('student-excuse-request-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#excuseRequestByStudentTable tbody');
                tbody.innerHTML = '';

                new DataTable('#excuseRequestByStudentTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none';
            }
        })
            
        .catch(error => {
            console.error('Error fetching student data:', error);
            document.getElementById('table-loader').style.display = 'none';
        });
    }

    /* Excuse Request Message - Modal Instance */

    const excuseMessageRequestModalContainer = document.getElementById('excuse-request-message-modal-container');

    if (excuseMessageRequestModalContainer) {
        let excuseRequestMessageId; // To hold the ID of the excuse request

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="excuse-request-message-modal"]')) {
                e.preventDefault();

                // Get the excuse request ID
                excuseRequestMessageId = e.target.closest('button').getAttribute('data-excuse-request-message-id');

                // Create modal HTML
                const modalHTML = `
                <div id="excuse-request-message-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
                    <div class="relative p-4 w-full max-w-lg">
                        <div class="relative bg-white rounded-lg shadow-lg border border-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-90 transform scale-105 p-6"
                            style="background-color: #ffffff; background-image: url('https://www.transparenttextures.com/patterns/lined-paper.png'); background-repeat: repeat;">
                            <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full w-8 h-8 flex justify-center items-center" data-modal-hide="excuse-request-message-modal">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-6 text-left">
                                <div id="excuse-message-details" class="bg-white p-6 rounded-lg shadow-sm font-light text-gray-700 dark:text-gray-200" 
                                    style="font-family: 'Cursive', serif; line-height: 1.6; border: 1px dashed gray;">
                                    <!-- Excuse message details will be injected here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

                // Inject the modal into the container
                excuseMessageRequestModalContainer.innerHTML = modalHTML;

                // Show the modal
                const excuseRequestModalEl = document.getElementById('excuse-request-message-modal');
                const excuseRequestModal = new Modal(excuseRequestModalEl);
                excuseRequestModal.show();

                // Handle fetching excuse request details
                axios.get(`/student/get-excuse-request-message/${excuseRequestMessageId}`)
                    .then(response => {
                        const excuseRequest = response.data; // Assuming the response structure
                        const excuseMessageDetailsContainer = document.getElementById('excuse-message-details');

                        // Populate the modal with the fetched data, styled to look handwritten
                        excuseMessageDetailsContainer.innerHTML = `
                            <p><strong>Message:</strong></p>
                            <p>${excuseRequest.excuse_message}</p>
                        `;
                    })
                    .catch(error => {
                        console.error('There was an error getting the excuse request message:', error);
                        document.getElementById('excuse-message-details').innerHTML = '<div class="text-red-500">Failed to fetch the message details. Please try again.</div>';
                    });

                // Handle modal close
                document.querySelector('[data-modal-hide="excuse-request-message-modal"]').addEventListener('click', function () {
                    excuseRequestModal.hide();
                    excuseMessageRequestModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }

    /* Delete - Modal Instance */

    const deleteExcuseRequestModalContainer = document.getElementById('delete-excuse-request-message-modal-container');

    if (deleteExcuseRequestModalContainer) {
        let deleteExcuseRequestId; // To hold the ID of the section to delete

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-excuse-message-request-modal"]')) {
                e.preventDefault();
                
                deleteExcuseRequestId = e.target.closest('button').getAttribute('data-excuse-request-message-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="delete-excuse-message-request-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 flex justify-center items-center" data-modal-hide="delete-excuse-message-request-modal">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-6 text-center">
                                    <svg class="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Delete Excuse Request?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                        This will permanently remove the excuse request, and it will no longer be visible to the teacher. 
                                        <strong>If the teacher has already approved the request</strong>, the student's absence will remain marked as excused, but this action cannot be undone.
                                    </p>
                                    <div class="flex justify-center space-x-3">
                                        <form action="">
                                            <button type="submit" id="delete-excuse-message-request-confirm-btn" data-modal-hide="delete-excuse-message-request-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-excuse-message-request-cancel-btn" data-modal-hide="delete-excuse-message-request-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteExcuseRequestModalContainer.innerHTML = modalHTML;

                // Show the modal
                const deleteExcuseRequestModalEl = document.getElementById('delete-excuse-message-request-modal');
                const deleteExcuseRequestModal = new Modal(deleteExcuseRequestModalEl);
                deleteExcuseRequestModal.show();

                // Handle confirmation
                document.querySelector('#delete-excuse-message-request-confirm-btn').addEventListener('click', function (e) {
                    e.preventDefault();

                    if (deleteExcuseRequestId) {
                        axios.delete(`/student/excuses/${deleteExcuseRequestId}`)
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
                                title: "Excuse request record deleted successfully!"
                            });

                            window.location.href = `/student/excuses`;
                        })
                        .catch(error => {
                            console.error('There was an error deleting the class schedule:', error);
                        });
                    }
                });

                // Handle modal close
                document.querySelector('[data-modal-hide="delete-excuse-message-request-modal"]').addEventListener('click', function () {
                    deleteExcuseRequestModal.hide();
                    deleteExcuseRequestModalContainer.innerHTML = ''; // Clear modal content
                });

                document.querySelector('#delete-excuse-message-request-cancel-btn').addEventListener('click', function (e) {
                    deleteExcuseRequestModal.hide();
                    deleteExcuseRequestModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }
}

