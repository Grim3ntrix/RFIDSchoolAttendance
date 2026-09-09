import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { refreshIcons } from "../icons";

dayjs.extend(utc);
dayjs.extend(timezone);

/* Shared table markup for both branches (with / without records). */
const excuseRequestsTable = `
    <div class="relative overflow-x-auto">
        <table id="classScheduleByStudentToReviewTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-4 py-3">Msg.</th>
                    <th scope="col" class="px-4 py-3">Grade/Yr. & Section</th>
                    <th scope="col" class="px-4 py-3">Class Schedule</th>
                    <th scope="col" class="px-4 py-3">From</th>
                    <th scope="col" class="px-4 py-3">To</th>
                    <th scope="col" class="px-4 py-3">Proof (Link)</th>
                    <th scope="col" class="px-4 py-3">Status</th>
                    <th scope="col" class="px-4 py-3">Created</th>
                    <th scope="col" class="px-4 py-3">Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>`;

const excuseRequestsEmptyState = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <i data-lucide="message-square" class="h-6 w-6"></i>
        </span>
        <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No excuse requests to review</h4>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Requests submitted by your students will appear here.</p>
    </div>`;

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
                document.getElementById('student-excuse-request-to-review-container').innerHTML = excuseRequestsTable;
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

                        const teacherFullName = `${classSchedule.teacher.first_name ?? teacherUserData.name ?? 'Teacher profile not updated'} ${classSchedule.teacher.middle_name ?? ''} ${classSchedule.teacher.last_name ?? ''}`.trim() || 'Personal details not updated';

                        const proof = excuse.proof;
                        const excuseStatus = excuse.excuse_request_status?.status ?? 'No Status';
                        const createdAt = convertToAsiaManilaTime(excuse.created_at);

                        // Create the table row for each excuse request
                        const row = document.createElement('tr');
                        row.className = 'border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50';
                        row.innerHTML = `
                            <td class="px-4 py-3">
                                <button type="button" data-modal-target="excuse-request-message-to-review-modal" data-modal-toggle="excuse-request-message-to-review-modal" data-excuse-message-request-id="${excuse.id}" title="View excuse message"
                                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                    <span class="sr-only">View excuse message from ${studentFullName}</span>
                                    <i data-lucide="message-square" class="h-5 w-5"></i>
                                </button>
                            </td>
                            <td class="px-4 py-3">${sectionData}</td>
                            <td class="px-4 py-3">${classSchedule.subject} (${classSchedule.subject_code}) - ${startTime}-${endTime} (${days || 'No Days'})</td>
                            <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${studentFullName}</td>
                            <td class="px-4 py-3 whitespace-nowrap">${teacherFullName}</td>
                            <td class="px-4 py-3">
                                ${proof
                                    ? `<a href="${proof.startsWith('http://') || proof.startsWith('https://') ? proof : 'https://' + proof}" target="_blank" class="font-medium text-primary-700 underline hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">View Proof</a>`
                                    : 'No proof'}
                            </td>
                            <td class="px-4 py-3">
                                <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">${excuseStatus.charAt(0).toUpperCase() + excuseStatus.slice(1)}</span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">${createdAt}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-1">
                                    <button type="button" data-modal-target="excuse-request-message-to-approve-modal" data-modal-toggle="excuse-request-message-to-approve-modal" data-excuse-request-class-schedule-id="${classSchedule.id}" data-student-id="${student.id}" title="Approve excuse request"
                                        class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                        <span class="sr-only">Approve excuse request from ${studentFullName}</span>
                                        <i data-lucide="thumbs-up" class="h-5 w-5"></i>
                                    </button>
                                    <button type="button" data-modal-target="excuse-request-message-to-decline-modal" data-modal-toggle="excuse-request-message-to-decline-modal" data-excuse-request-class-schedule-id="${classSchedule.id}" data-student-id="${student.id}" title="Decline excuse request"
                                        class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400">
                                        <span class="sr-only">Decline excuse request from ${studentFullName}</span>
                                        <i data-lucide="thumbs-down" class="h-5 w-5"></i>
                                    </button>
                                </div>
                            </td>
                        `;

                        // Append the row to the table body
                        tbody.appendChild(row);
                    });
                });

                refreshIcons();

                // Initialize DataTable with proper options
                new DataTable('#classScheduleByStudentToReviewTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 10,
                });

                document.getElementById('table-loader').style.display = 'none';
            } else {
                document.getElementById('student-excuse-request-to-review-container').innerHTML = excuseRequestsEmptyState;
                refreshIcons();

                document.getElementById('table-loader').style.display = 'none';
            }

        })

        .catch(error => {
            console.error('Error fetching student data:', error);
            document.getElementById('table-loader').style.display = 'none';
        });
    }

    // Register the decline handler once (not per rendered row)
    declineStudentExcuseRequest();

    /* Excuse Request Message - Modal Instance */

    const excuseMessageRequestToReviewModalContainer = document.getElementById('excuse-request-message-to-review-modal-container');

    if (excuseMessageRequestToReviewModalContainer) {
        let excuseMessageRequestToReviewId; // To hold the ID of the excuse request

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="excuse-request-message-to-review-modal"]')) {
                e.preventDefault();

                // Get the excuse request ID
                excuseMessageRequestToReviewId = e.target.closest('button').getAttribute('data-excuse-message-request-id');

                // Create modal HTML
                const modalHTML = `
                <div id="excuse-request-message-to-review-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-lg max-h-full">
                        <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Excuse Message</h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="excuse-request-message-to-review-modal">
                                    <span class="sr-only">Close modal</span>
                                    <i data-lucide="x" class="h-3.5 w-3.5"></i>
                                </button>
                            </div>
                            <div class="p-4 md:p-5">
                                <div id="excuse-message-details" class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm leading-relaxed text-gray-700 dark:border-gray-600 dark:bg-gray-900/40 dark:text-gray-200">
                                    <!-- Excuse message details will be injected here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

                // Inject the modal into the container
                excuseMessageRequestToReviewModalContainer.innerHTML = modalHTML;
                refreshIcons();

                // Show the modal
                const excuseRequestToReviewModalEl = document.getElementById('excuse-request-message-to-review-modal');
                const excuseRequestToReviewModal   = new Modal(excuseRequestToReviewModalEl);
                excuseRequestToReviewModal.show();

                // Handle fetching excuse request details
                axios.get(`/teacher/get-excuse-request-message/${excuseMessageRequestToReviewId}`)
                    .then(response => {
                        const excuseRequestToReview         = response.data; // Assuming the response structure
                        const excuseMessageDetailsContainer = document.getElementById('excuse-message-details');

                        // Populate the modal with the fetched data
                        excuseMessageDetailsContainer.innerHTML = `
                            <p class="mb-2 font-medium text-gray-900 dark:text-white">Message:</p>
                            <p>${excuseRequestToReview.excuse_message}</p>
                        `;
                    })
                    .catch(error => {
                        console.error('There was an error getting the excuse request message:', error);
                        document.getElementById('excuse-message-details').innerHTML = '<div class="text-red-600 dark:text-red-400">Failed to fetch the message details. Please try again.</div>';
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
        let excuseRequestClassScheduleId; // To hold the ID of the class schedule of excuse request
        let studentId; // To hold the ID of the student id of excuse request

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="excuse-request-message-to-approve-modal"]')) {
                e.preventDefault();

                // Get the excuse request class schedule ID
                const button = e.target.closest('button');
                excuseRequestClassScheduleId = button.getAttribute('data-excuse-request-class-schedule-id');
                studentId = button.getAttribute('data-student-id');

                const excuseRequestClassScheduleAttendanceModalHTML = `
                <div id="excuse-request-message-to-approve-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative w-full max-w-4xl max-h-full">
                        <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Attendance to Excuse
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="excuse-request-message-to-approve-modal">
                                    <span class="sr-only">Close modal</span>
                                    <i data-lucide="x" class="h-3.5 w-3.5"></i>
                                </button>
                            </div>
                            <div class="p-4 md:p-5">
                                <div id="table-loader" class="flex justify-center items-center gap-3 py-10">
                                    <i data-lucide="loader-circle" class="h-8 w-8 animate-spin text-primary-600"></i>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Loading data, please wait...</span>
                                </div>

                                <div id="excuse-request-class-schedule-attendance-table-container"></div>
                            </div>
                        </div>
                    </div>
                </div>`;

                // Inject the modal HTML into the container
                excuseRequestClassScheduleAttendanceModalContainer.innerHTML = excuseRequestClassScheduleAttendanceModalHTML;
                refreshIcons();

                // Show the modal
                const excuseRequestClassScheduleAttendanceModalEl = document.getElementById('excuse-request-message-to-approve-modal');
                const excuseRequestClassScheduleAttendanceModal = new Modal(excuseRequestClassScheduleAttendanceModalEl);
                excuseRequestClassScheduleAttendanceModal.show();

                const tableLoader = document.getElementById('table-loader');

                if (tableLoader) {
                    tableLoader.style.display = 'flex';

                    /* Axios GET request to populate the datatable */

                    axios.get(`/teacher/get-excuse-request-class-schedule-attendance/${excuseRequestClassScheduleId}/${studentId}`)
                    .then(response => {
                        const classScheduleAttendanceData = response.data;

                        /* Datatable */

                        if (classScheduleAttendanceData.length > 0) {
                            const tableHTML = `
                                <div class="relative overflow-x-auto">
                                    <table id="studentExcuseRequestClassScheduleAttendanceTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-4 py-3">RFID Serial Number</th>
                                                <th scope="col" class="px-4 py-3">Status</th>
                                                <th scope="col" class="px-4 py-3">Created At</th>
                                                <th scope="col" class="px-4 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>`;

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
                                const buttonClass = isExcused
                                    ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                                    : 'text-primary-700 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-600/10';
                                const buttonText = isExcused ? 'Excused' : 'Excuse'; // Change button text if already excused

                                const row = document.createElement('tr');
                                row.className = 'border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50';
                                row.innerHTML = `
                                    <td class="px-4 py-3">${attendance.rfid_serial_number}</td>
                                    <td class="px-4 py-3">
                                        <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">${attendance.attendance_status.status.charAt(0).toUpperCase() + attendance.attendance_status.status.slice(1)}</span>
                                    </td>
                                    <td class="px-4 py-3 whitespace-nowrap">${attendanceCreatedAt}</td>
                                    <td class="px-4 py-3">
                                        <button type="button" class="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium excuse-btn focus:outline-none focus:ring-2 focus:ring-primary-300 ${buttonClass}" ${isExcused ? 'disabled' : ''} data-student-class-schedule-attendance-id="${attendance.id}" data-action="approve">
                                            <i data-lucide="check" class="h-4 w-4"></i>
                                            <span>${buttonText}</span>
                                        </button>
                                    </td>
                                `;
                                tbody.appendChild(row); // Add row data to tbody
                            });

                            refreshIcons();

                            // Add click event listener to the parent element (tbody)
                            tbody.addEventListener('click', function(event) {
                                // Check if the clicked element is the "Excuse" button
                                if (event.target.closest('.excuse-btn')) {
                                    const excuseButton = event.target.closest('.excuse-btn');
                                    const attendanceId = excuseButton.getAttribute('data-student-class-schedule-attendance-id');

                                    if (attendanceId) {
                                        markExcuseStudentAttendance(attendanceId);  // Call the function and pass the attendanceId
                                    }
                                }
                            });

                            // Initialize DataTable with proper options
                            new DataTable('#studentExcuseRequestClassScheduleAttendanceTable', {
                                searchable: true,
                                fixedHeight: true,
                                sortable: true,
                                perPage: 10,
                            });

                            // Hide the loader after rendering the table
                            tableLoader.style.display = 'none';

                        } else {
                            document.getElementById('excuse-request-class-schedule-attendance-table-container').innerHTML = `
                                <div class="flex flex-col items-center justify-center py-12 text-center">
                                    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                        <i data-lucide="calendar-days" class="h-6 w-6"></i>
                                    </span>
                                    <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No attendance records to excuse yet</h4>
                                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Attendance records for this class schedule will appear here once recorded.</p>
                                </div>`;
                            refreshIcons();

                            tableLoader.style.display = 'none';
                        }
                    })

                    .catch(error => {
                        // console.error('There was an error getting the excuse request class schedule attendance:', error);
                        tableLoader.style.display = 'none';
                        const attendanceTableBody = document.getElementById('excuse-request-class-schedule-attendance-table-container');
                        attendanceTableBody.innerHTML = `
                            <div class="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300" role="alert">
                                <i data-lucide="circle-alert" class="h-5 w-5 flex-shrink-0"></i>
                                <span><span class="font-semibold">Important notice:</span> Students can only be marked as excused after the system has automatically recorded them as absent. Thank you for your cooperation.</span>
                            </div>`;
                        refreshIcons();
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

function markExcuseStudentAttendance(attendanceId)
{

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
        let classScheduleAttendanceToDeclineId; // To hold the ID of the excuse request to decline
        let studentId; // To hold the ID of the student of the excuse request

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="excuse-request-message-to-decline-modal"]')) {
                e.preventDefault();

                const button = e.target.closest('button');
                classScheduleAttendanceToDeclineId = button.getAttribute('data-excuse-request-class-schedule-id');
                studentId = button.getAttribute('data-student-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="excuse-request-message-to-decline-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-xl shadow-lg dark:bg-gray-800">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="excuse-request-message-to-decline-modal">
                                    <span class="sr-only">Close modal</span>
                                    <i data-lucide="x" class="h-4 w-4"></i>
                                </button>
                                <div class="p-6 text-center">
                                    <span class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-600/10 dark:text-red-400">
                                        <i data-lucide="circle-alert" class="h-6 w-6"></i>
                                    </span>
                                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Decline this excuse request?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                        This action will permanently remove the excuse request from the system, making it unavailable for future requests or review.
                                    </p>
                                    <div class="flex justify-center gap-3">
                                        <form action="">
                                            <button type="submit" id="decline-excuse-request-confirm-btn" data-modal-hide="excuse-request-message-to-decline-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Decline
                                            </button>
                                        </form>
                                        <button id="decline-excuse-request-cancel-btn" data-modal-hide="excuse-request-message-to-decline-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                declineExcuseRequestModalContainer.innerHTML = modalHTML;
                refreshIcons();

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
