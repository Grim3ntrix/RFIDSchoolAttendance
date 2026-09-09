import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { refreshIcons } from "../icons";

dayjs.extend(utc);
dayjs.extend(timezone);

/* Shared table markup for both branches (with / without records). */
const excuseRequestTable = `
    <div class="relative overflow-x-auto">
        <table id="excuseRequestByStudentTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
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

const excuseRequestEmptyState = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <i data-lucide="message-square" class="h-6 w-6"></i>
        </span>
        <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No excuse requests yet</h4>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Compose a request to ask a teacher to excuse an absence.</p>
    </div>`;

export function studentExcuse() {
    // console.log("Student excuse page function triggered.");

    const studentExcuseRequestContainer = document.getElementById('student-excuse-request-container');

    if (studentExcuseRequestContainer) {
        composeExcuseRequestBtn();
        classScheduleJsonRequest();
        ExcuseRequestDatatable();
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

                        let errorMessage = errors[key][0];

                        let errorElement = document.createElement('p');
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'dark:text-red-400', 'error-message');
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
        const classScheduleByStudent = response.data.classSchedules;

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
                    recipientElement.value = `${classSchedule.teacher.first_name ?? classSchedule.teacher.user.name ?? 'Teacher profile not updated'} ${classSchedule.teacher.middle_name ?? ''} ${classSchedule.teacher.last_name ?? ''} ${classSchedule.teacher.name_extension ?? ''}`;
                }
            });

            // Add event listener to update fields when a class schedule is selected
            selectElement.addEventListener('change', (event) => {
                const selectedClassSchedule = classScheduleByStudent.find(classSchedule => classSchedule.id == event.target.value);

                if (selectedClassSchedule) {
                    sectionElement.value = `${selectedClassSchedule.section.section_name} (${selectedClassSchedule.section.grade_or_year_level})`;
                    recipientElement.value = `${selectedClassSchedule.teacher.first_name ?? selectedClassSchedule.teacher.user.name ?? 'Teacher profile not updated'} ${selectedClassSchedule.teacher.middle_name ?? ''} ${selectedClassSchedule.teacher.last_name ?? ''} ${selectedClassSchedule.teacher.name_extension ?? ''}`;
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
                document.getElementById('student-excuse-request-container').innerHTML = excuseRequestTable;
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
                    row.className = 'border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50';

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

                    const excuseStatus = excuseRequestStatusData?.status ?? 'No Status';

                    // Populate the table row
                    row.innerHTML = `
                        <td class="px-4 py-3">
                            <button type="button" data-modal-target="excuse-request-message-modal" data-modal-toggle="excuse-request-message-modal" data-excuse-request-message-id="${excuseRequest.id}" title="View excuse message"
                                class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                <span class="sr-only">View excuse message</span>
                                <i data-lucide="message-square" class="h-5 w-5"></i>
                            </button>
                        </td>
                        <td class="px-4 py-3">${sectionData?.grade_or_year_level ?? 'N/A'}-${sectionData?.section_name ?? 'N/A'}</td>
                        <td class="px-4 py-3">${classScheduleData?.subject ?? 'No Subject'} (${classScheduleData?.subject_code ?? ''}) - ${startTime ?? 'N/A'}-${endTime ?? 'N/A'} (${days || 'No Days'})</td>
                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${studentFullName}</td>
                        <td class="px-4 py-3 whitespace-nowrap">${teacherFullName || 'Personal details not yet updated by the teacher'}</td>
                        <td class="px-4 py-3">
                            ${proof
                            ? `<a href="${proof.startsWith('http://') || proof.startsWith('https://') ? proof : 'https://' + proof}" target="_blank" class="font-medium text-primary-700 underline hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                                View Proof
                            </a>`
                            : 'No proof'}
                        </td>
                        <td class="px-4 py-3">
                            <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">${excuseStatus.charAt(0).toUpperCase() + excuseStatus.slice(1)}</span>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap">${attendanceCreatedAt}</td>
                        <td class="px-4 py-3">
                            <button type="button" data-modal-target="delete-excuse-message-request-modal" data-modal-toggle="delete-excuse-message-request-modal" data-excuse-request-message-id="${excuseRequest.id}" title="Delete excuse request"
                                class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400">
                                <span class="sr-only">Delete excuse request</span>
                                <i data-lucide="trash-2" class="h-5 w-5"></i>
                            </button>
                        </td>
                    `;

                    // Append the row to tbody for each excuse request
                    tbody.appendChild(row);
                });

                refreshIcons();

                // Initialize DataTable with proper options
                new DataTable('#excuseRequestByStudentTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 10,
                });

                // Hide the loader after rendering the table
                document.getElementById('table-loader').style.display = 'none';

            } else {
                document.getElementById('student-excuse-request-container').innerHTML = excuseRequestEmptyState;
                refreshIcons();

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
                <div id="excuse-request-message-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-lg max-h-full">
                        <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Excuse Message</h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="excuse-request-message-modal">
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
                excuseMessageRequestModalContainer.innerHTML = modalHTML;
                refreshIcons();

                // Show the modal
                const excuseRequestModalEl = document.getElementById('excuse-request-message-modal');
                const excuseRequestModal = new Modal(excuseRequestModalEl);
                excuseRequestModal.show();

                // Handle fetching excuse request details
                axios.get(`/student/get-excuse-request-message/${excuseRequestMessageId}`)
                    .then(response => {
                        const excuseRequest = response.data; // Assuming the response structure
                        const excuseMessageDetailsContainer = document.getElementById('excuse-message-details');

                        // Populate the modal with the fetched data
                        excuseMessageDetailsContainer.innerHTML = `
                            <p class="mb-2 font-medium text-gray-900 dark:text-white">Message:</p>
                            <p>${excuseRequest.excuse_message}</p>
                        `;
                    })
                    .catch(error => {
                        console.error('There was an error getting the excuse request message:', error);
                        document.getElementById('excuse-message-details').innerHTML = '<div class="text-red-600 dark:text-red-400">Failed to fetch the message details. Please try again.</div>';
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
        let deleteExcuseRequestId; // To hold the ID of the excuse request to delete

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-excuse-message-request-modal"]')) {
                e.preventDefault();

                deleteExcuseRequestId = e.target.closest('button').getAttribute('data-excuse-request-message-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="delete-excuse-message-request-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-xl shadow-lg dark:bg-gray-800">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-excuse-message-request-modal">
                                    <span class="sr-only">Close modal</span>
                                    <i data-lucide="x" class="h-4 w-4"></i>
                                </button>
                                <div class="p-6 text-center">
                                    <span class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-600/10 dark:text-red-400">
                                        <i data-lucide="circle-alert" class="h-6 w-6"></i>
                                    </span>
                                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Delete this excuse request?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                        This will permanently remove the excuse request, and it will no longer be visible to the teacher.
                                        <strong>If the teacher has already approved the request</strong>, the student's absence will remain marked as excused, but this action cannot be undone.
                                    </p>
                                    <div class="flex justify-center gap-3">
                                        <form action="">
                                            <button type="submit" id="delete-excuse-message-request-confirm-btn" data-modal-hide="delete-excuse-message-request-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-excuse-message-request-cancel-btn" data-modal-hide="delete-excuse-message-request-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteExcuseRequestModalContainer.innerHTML = modalHTML;
                refreshIcons();

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
                            console.error('There was an error deleting the excuse request:', error);
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
