import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';

dayjs.extend(utc);
dayjs.extend(timezone);

export function studentClassScheduleToReview() {
    // console.log("Teacher excuse request to review page function triggered.");

    const studentclassScheduleToReviewContainer = document.getElementById('student-excuse-request-to-review-container');
    
    if (studentclassScheduleToReviewContainer) {
        studentClassScheduleToReviewDataTable();
    }
}

function studentClassScheduleToReviewDataTable()
{
    /* Datatable*/

    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get(`/teacher/get-excuse-request-by-student-to-review`)
        .then(response => {
            const classScheduleByStudentToReview = response.data;

            if (classScheduleByStudentToReview.length > 0) {
                const tableHTML = `
                    <table id="classScheduleByStudentToReviewTable" class="bg-gray-50 dark:bg-gray-800">
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
            
                document.getElementById('student-excuse-request-to-review-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#classScheduleByStudentToReviewTable tbody');
                tbody.innerHTML = '';
            
                function convertToAmPm(time) {
                    const [hours, minutes] = time.split(':');
                    const suffix = hours >= 12 ? 'PM' : 'AM';
                    const adjustedHours = hours % 12 || 12;
                    return `${adjustedHours}:${minutes} ${suffix}`;
                }
            
                function convertToAsiaManilaTime(datetime) {
                    return dayjs(datetime).tz('Asia/Manila').format('MMM-DD-YYYY h:mm A');
                }
            
                // Iterate through class schedules
                classScheduleByStudentToReview.forEach(classSchedule => {
                    const sectionData = `${classSchedule.section?.grade_or_year_level ?? 'N/A'} - ${classSchedule.section?.section_name ?? 'N/A'}`;
                    const days = classSchedule.days_of_week.map(day => day.day_name).join(', ');
                    const startTime = convertToAmPm(classSchedule.start_time);
                    const endTime = convertToAmPm(classSchedule.end_time);

                    // Iterate through each excuse request within the class schedule
                    classSchedule.excuse_request.forEach(excuse => {
                        const student = excuse.student;
                        const studentFullName = `${student?.first_name ?? ''} ${student?.middle_name ?? ''} ${student?.last_name ?? ''}`.trim();
                        
                        const teacherUserData = classSchedule.teacher?.user || {};

                        const teacherFullName = `${classSchedule.teacher.first_name ?? teacherUserData.name ?? 'Unknown Teacher'} ${classSchedule.teacher.middle_name ?? ''} ${classSchedule.teacher.last_name ?? ''}`.trim() || 'Personal details not updated';

                        const proof = excuse.proof;
                        const excuseStatus = excuse.excuse_request_status?.status ?? 'No Status';
                        const createdAt = convertToAsiaManilaTime(excuse.created_at);

                        // Create the table row for each excuse request
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="text-center">
                                <div class="flex justify-center">
                                    <button type="button" data-modal-target="excuse-request-message-to-review-modal" data-modal-toggle="excuse-request-message-to-review-modal" class="text-blue-500 hover:underline" data-excuse-message-request-id="${excuse.id}">
                                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td>${sectionData}</td>
                            <td>${classSchedule.subject} (${classSchedule.subject_code}) - ${startTime}-${endTime} (${days || 'No Days'})</td>
                            <td>${studentFullName}</td>
                            <td>${teacherFullName}</td>
                            <td>
                                ${proof 
                                    ? `<a href="${proof.startsWith('http://') || proof.startsWith('https://') ? proof : 'https://' + proof}" target="_blank" class="text-blue-500 hover:text-blue-700 underline">View Proof</a>`
                                    : 'No proof'}
                            </td>
                            <td>${excuseStatus}</td>
                            <td>${createdAt}</td>
                            <td class="text-center">
                                <div class="flex justify-center">
                                    <button type="button" data-modal-target="excuse-request-message-to-approve-modal" data-modal-toggle="excuse-request-message-to-approve-modal" class="text-blue-500 hover:underline" data-excuse-request-class-schedule-id="${classSchedule.id}">
                                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-blue-600 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                    <button type="button" data-modal-target="excuse-request-message-to-decline-modal" data-modal-toggle="excuse-request-message-to-decline-modal" class="text-blue-500 hover:underline" data-excuse-request-class-schedule-id="${classSchedule.id}">
                                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M8.97 14.316H5.004c-.322 0-.64-.08-.925-.232a2.022 2.022 0 0 1-.717-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.201C5.769 3.54 5.96 3 7.365 3c2.072 0 4.276.678 6.156 1.256.473.145.925.284 1.35.404h.114v9.862a25.485 25.485 0 0 0-4.238 5.514c-.197.376-.516.67-.901.83a1.74 1.74 0 0 1-1.21.048 1.79 1.79 0 0 1-.96-.757 1.867 1.867 0 0 1-.269-1.211l1.562-4.63ZM19.822 14H17V6a2 2 0 1 1 4 0v6.823c0 .65-.527 1.177-1.177 1.177Z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        `;

                        declineStudentExcuseRequest();

                        // Append the row to the table body
                        tbody.appendChild(row);
                    });
                });

                document.getElementById('table-loader').style.display = 'none';

                // Initialize DataTable with proper options
                new DataTable('#classScheduleByStudentToReviewTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 10,
                });

                document.getElementById('table-loader').style.display = 'none';
            } else {
                const tableHTML = `
                    <table id="classScheduleByStudentToReviewTable" class="bg-gray-50 dark:bg-gray-800">
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

                document.getElementById('student-excuse-request-to-review-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#classScheduleByStudentToReviewTable tbody');
                tbody.innerHTML = '';

                new DataTable('#classScheduleByStudentToReviewTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 10,
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

    const excuseMessageRequestToReviewModalContainer = document.getElementById('excuse-request-message-to-review-modal-container');

    if (excuseMessageRequestToReviewModalContainer) {
        let excuseMessgaeRequestToReviewId; // To hold the ID of the excuse request

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="excuse-request-message-to-review-modal"]')) {
                e.preventDefault();

                // Get the excuse request ID
                excuseMessgaeRequestToReviewId = e.target.closest('button').getAttribute('data-excuse-message-request-id');

                // Create modal HTML
                const modalHTML = `
                <div id="excuse-request-message-to-review-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
                    <div class="relative p-4 w-full max-w-lg">
                        <div class="relative bg-white rounded-lg shadow-lg border border-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-90 transform scale-105 p-6"
                            style="background-color: #ffffff; background-image: url('https://www.transparenttextures.com/patterns/lined-paper.png'); background-repeat: repeat;">
                            <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full w-8 h-8 flex justify-center items-center" data-modal-hide="excuse-request-message-to-review-modal">
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
                excuseMessageRequestToReviewModalContainer.innerHTML = modalHTML;

                // Show the modal
                const excuseRequestToReviewModalEl = document.getElementById('excuse-request-message-to-review-modal');
                const excuseRequestToReviewModal   = new Modal(excuseRequestToReviewModalEl);
                excuseRequestToReviewModal.show();

                // Handle fetching excuse request details
                axios.get(`/teacher/get-excuse-request-message/${excuseMessgaeRequestToReviewId}`)
                    .then(response => {
                        const excuseRequestToReview         = response.data; // Assuming the response structure
                        const excuseMessageDetailsContainer = document.getElementById('excuse-message-details');

                        // Populate the modal with the fetched data, styled to look handwritten
                        excuseMessageDetailsContainer.innerHTML = `
                            <p><strong>Message:</strong></p>
                            <p>${excuseRequestToReview.excuse_message}</p>
                        `;
                    })
                    .catch(error => {
                        console.error('There was an error getting the excuse request message:', error);
                        document.getElementById('excuse-message-details').innerHTML = '<div class="text-red-500">Failed to fetch the message details. Please try again.</div>';
                    });

                // Handle modal close
                document.querySelector('[data-modal-hide="excuse-request-message-to-review-modal"]').addEventListener('click', function () {
                    excuseRequestToReviewModal.hide();
                    excuseMessageRequestToReviewModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }

    /* Excuse Request Class Schedule Attendance- Modal Instance */

    const excuseRequestClassScheduleAttendanceModalContainer = document.getElementById('excuse-request-class-schedule-attendance-modal-container');

    if (excuseRequestClassScheduleAttendanceModalContainer) {
        let excuseRequestClassScheduleId; // To hold the ID of the excuse request

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="excuse-request-message-to-approve-modal"]')) {
                e.preventDefault();

                // Get the excuse request class schedule ID
                excuseRequestClassScheduleId = e.target.closest('button').getAttribute('data-excuse-request-class-schedule-id');

                const excuseRequestClassScheduleAttendanceModalHTML = `
                <div id="excuse-request-message-to-approve-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative w-full max-w-4xl max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                    Attendance to Excuse
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="excuse-request-message-to-approve-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5 space-y-1">
                                <div id="table-loader" class="flex justify-center items-center py-10">
                                    <svg role="status" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08125 50.5908C9.08125 73.5495 27.0413 91.5095 50 91.5095C72.9587 91.5095 90.9188 73.5495 90.9188 50.5908C90.9188 27.6321 72.9587 9.67209 50 9.67209C27.0413 9.67209 9.08125 27.6321 9.08125 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5536C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7233 75.2124 7.41289C69.5422 4.10248 63.2754 1.94025 56.7335 1.05189C51.7661 0.367391 46.7345 0.446447 41.8062 1.27873C39.324 1.69443 37.8557 4.19778 38.4928 6.62326C39.1299 9.04874 41.6119 10.5012 44.1076 10.1076C47.8923 9.47543 51.7426 9.52629 55.4747 10.2485C60.8569 11.2887 65.968 13.4632 70.543 16.6697C75.118 19.8763 79.0733 24.0361 82.1918 28.9444C84.7348 32.8122 86.6207 37.1317 87.7824 41.708C88.4351 44.0608 91.5422 45.6781 93.9676 45.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span>Loading data, please wait...</span>
                                </div>

                                <div id="excuse-request-class-schedule-attendance-table-container"></div>
                            </div>
                        </div>
                    </div>
                </div>`;

                // Inject the modal HTML into the container
                excuseRequestClassScheduleAttendanceModalContainer.innerHTML = excuseRequestClassScheduleAttendanceModalHTML;

                // Show the modal
                const excuseRequestClassScheduleAttendanceModalEl = document.getElementById('excuse-request-message-to-approve-modal');
                const excuseRequestClassScheduleAttendanceModal = new Modal(excuseRequestClassScheduleAttendanceModalEl);
                excuseRequestClassScheduleAttendanceModal.show();

                const tableLoader = document.getElementById('table-loader');

                if (tableLoader) {
                    tableLoader.style.display = 'flex';

                    /* Axios GET request to populate the datatable */

                    axios.get(`/teacher/get-excuse-request-class-schedule-attendance/${excuseRequestClassScheduleId}`)
                    .then(response => {
                        const classScheduleAttendanceData = response.data;

                        /* Datatable */

                        if (classScheduleAttendanceData.length > 0) {
                            const tableHTML = `
                            <table id="studentExcuseRequestClassScheduleAttendanceTable" class="bg-gray-50 dark:bg-gray-800">
                                <thead>
                                    <tr>
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
                                                Status
                                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                                </svg>
                                            </span>
                                        </th>
                                        <th>
                                            <span class="flex items-center">
                                                Created At
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

                            document.getElementById('excuse-request-class-schedule-attendance-table-container').innerHTML = tableHTML;
                            const tbody = document.querySelector('#studentExcuseRequestClassScheduleAttendanceTable tbody');
                            tbody.innerHTML = '';

                            function convertToAsiaManilaTime(datetime) {
                                return dayjs(datetime).tz('Asia/Manila').format('MMM-DD-YYYY h:mm A'); // Convert to Asia/Manila and format to 12-hour
                            }
  
                            classScheduleAttendanceData.forEach(attendance => {
                                const attendanceCreatedAt = convertToAsiaManilaTime(attendance.created_at);
                            
                                // Check if the status is 'excuse'
                                const isExcused = attendance.attendance_status.status === 'excuse';
                                const buttonDisabled = isExcused ? 'disabled cursor-not-allowed text-gray-400' : 'text-blue-500 hover:underline';
                                const buttonText = isExcused ? 'Excused' : 'Excuse'; // Change button text if already excused
                            
                                const row = `
                                    <tr>
                                    <td>${attendance.rfid_serial_number}</td>
                                    <td>${attendance.attendance_status.status}</td>
                                    <td>${attendanceCreatedAt}</td>
                                    <td>
                                        <div>
                                            <button class="flex items-center justify-center space-x-2 font-semibold excuse-btn ${buttonDisabled} hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isExcused ? 'disabled' : ''}" ${isExcused ? 'disabled' : ''} data-student-class-schedule-attendance-id="${attendance.id}" data-action="approve">
                                                <svg class="w-4 h-4 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"/>
                                                </svg>
                                                <span>${buttonText}</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>`;
                                tbody.innerHTML += row; // Add row data to tbody
                            });

                            // Add click event listeners to all "Excuse" buttons
                            const excuseButtons = document.querySelectorAll('.excuse-btn');
                            excuseButtons.forEach(button => {
                                button.addEventListener('click', function() {
                                    const attendanceId = this.getAttribute('data-student-class-schedule-attendance-id');  // Get the data-id of the clicked button
                                    if (attendanceId) {
                                     markExcuseStudentAttendance(attendanceId);  // Call the function and pass the attendanceId
                                    }
                                });
                            });
                            
                            // Initialize DataTable with proper options
                            new DataTable('#studentExcuseRequestClassScheduleAttendanceTable', {
                                searchable: true,
                                fixedHeight: true,
                                sortable: true,
                                perPage: 10,
                            });
                            
                            // Hide the loader after rendering the table
                            document.getElementById('table-loader').style.display = 'none';

                        } else {
                            const tableHTML = `
                                <div id="excuse-request-message-to-approve-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div class="relative w-full max-w-4xl max-h-full">
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                                Attendance to Excuse
                                            </h3>
                                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="excuse-request-message-to-approve-modal">
                                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div class="p-4 md:p-5 space-y-4">
                                            <div id="table-loader" class="flex justify-center items-center py-10">
                                                <svg role="status" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08125 50.5908C9.08125 73.5495 27.0413 91.5095 50 91.5095C72.9587 91.5095 90.9188 73.5495 90.9188 50.5908C90.9188 27.6321 72.9587 9.67209 50 9.67209C27.0413 9.67209 9.08125 27.6321 9.08125 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5536C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7233 75.2124 7.41289C69.5422 4.10248 63.2754 1.94025 56.7335 1.05189C51.7661 0.367391 46.7345 0.446447 41.8062 1.27873C39.324 1.69443 37.8557 4.19778 38.4928 6.62326C39.1299 9.04874 41.6119 10.5012 44.1076 10.1076C47.8923 9.47543 51.7426 9.52629 55.4747 10.2485C60.8569 11.2887 65.968 13.4632 70.543 16.6697C75.118 19.8763 79.0733 24.0361 82.1918 28.9444C84.7348 32.8122 86.6207 37.1317 87.7824 41.708C88.4351 44.0608 91.5422 45.6781 93.9676 45.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span>Loading data, please wait...</span>
                                            </div>

                                            <div id="excuse-request-class-schedule-attendance-table-container"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                            document.getElementById('excuse-request-class-schedule-attendance-table-container').innerHTML = tableHTML;
                            const tbody = document.querySelector('#studentExcuseRequestClassScheduleAttendanceTable tbody');
                            tbody.innerHTML = '';

                            new DataTable('#studentExcuseRequestClassScheduleAttendanceTable', {
                                searchable: true,
                                fixedHeight: true,
                                sortable: true,
                                perPage: 10,
                            });

                            document.getElementById('table-loader').style.display = 'none';
                        }
                    })
                        
                    .catch(error => {
                        // console.error('There was an error getting the excuse request class schedule attendance:', error);
                        document.getElementById('table-loader').style.display = 'none';
                        const attendanceTableBody = document.getElementById('excuse-request-class-schedule-attendance-table-container');
                        attendanceTableBody.innerHTML = `
                        <tr>
                            <td colspan="4" class="border border-gray-300 p-2 bg-yellow-100 text-yellow-800 font-semibold">
                                <span class="text-red-600">Important Notice:</span> Students can only be marked as excused after the system has automatically recorded them as absent. Thank you for your cooperation.
                            </td>
                        </tr>`;
                    });
                }

                // Handle modal close
                document.querySelector('[data-modal-hide="excuse-request-message-to-approve-modal"]').addEventListener('click', function () {
                    excuseRequestClassScheduleAttendanceModal.hide();
                    excuseRequestClassScheduleAttendanceModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }
}

function markExcuseStudentAttendance($attendanceId) 
{
    const attendanceId = $attendanceId;

    axios.post(`/teacher/mark-excuse-student-attendances/${attendanceId}`, {
        headers: {
            'X-HTTP-Method-Override': 'PUT',
        }
    })
    .then(response => {
        // Show success notification
        Swal.fire({
            icon: "success",
            title: "Attendance status updated to excused successfully!",
            showConfirmButton: true
        }).then(() => {
            // Redirect to the excuses page after the user closes the success alert
            window.location.href = '/teacher/excuses';
        });
    })
    .catch(error => {
        if (error.response && error.response.status === 409) {
            // Popup if the attendance is already marked as excused
            Swal.fire({
                icon: "info",
                title: "Already Excused",
                text: "This student's attendance is already marked as excused.",
                showConfirmButton: true
            });
        } else {
            // Handle other errors, like server errors (500)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An unexpected error occurred. Please try again.",
                showConfirmButton: true
            });
        }
    });  
}

function declineStudentExcuseRequest() {
    const declineExcuseRequestModalContainer = document.getElementById('teacher-excuse-request-to-decline-modal-container');

    if (declineExcuseRequestModalContainer) {
        let classScheduleAttendanceToDeclineId; // To hold the ID of the section to delete

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="excuse-request-message-to-decline-modal"]')) {
                e.preventDefault();
                
                classScheduleAttendanceToDeclineId = e.target.closest('button').getAttribute('data-excuse-request-class-schedule-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="excuse-request-message-to-decline-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 flex justify-center items-center" data-modal-hide="excuse-request-message-to-decline-modal">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-6 text-center">
                                    <svg class="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Decline Excuse Request?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                        This action will permanently remove the excuse request from the system, making it unavailable for future requests or review. 
                                    </p>
                                    <div class="flex justify-center space-x-3">
                                        <form action="">
                                            <button type="submit" id="decline-excuse-request-confirm-btn"  data-modal-hide="excuse-request-message-to-decline-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Decline
                                            </button>
                                        </form>
                                        <button id="decline-excuse-request-cancel-btn" data-modal-hide="excuse-request-message-to-decline-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                declineExcuseRequestModalContainer.innerHTML = modalHTML;

                // Show the modal
                const declineExcuseRequestModalEl = document.getElementById('excuse-request-message-to-decline-modal');
                const declineExcuseRequestModal = new Modal(declineExcuseRequestModalEl);
                declineExcuseRequestModal.show();

                // Handle confirmation
                document.querySelector('#decline-excuse-request-confirm-btn').addEventListener('click', function (e) {
                    e.preventDefault();

                    if (classScheduleAttendanceToDeclineId) {

                        axios.post(`/teacher/decline-excuse-request/${classScheduleAttendanceToDeclineId}`, {
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
                                title: "Excuse request record declined successfully!"
                            });

                            window.location.href = `/teacher/excuses`;
                        })
                        .catch(error => {
                            console.error('There was an error rejecting the excuse request:', error);
                        });
                    }
                });

                // Handle modal close
                document.querySelector('[data-modal-hide="excuse-request-message-to-decline-modal"]').addEventListener('click', function () {
                    declineExcuseRequestModal.hide();
                    declineExcuseRequestModalContainer.innerHTML = ''; // Clear modal content
                });

                document.querySelector('#decline-excuse-request-cancel-btn').addEventListener('click', function (e) {
                    declineExcuseRequestModal.hide();
                    declineExcuseRequestModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }
}
