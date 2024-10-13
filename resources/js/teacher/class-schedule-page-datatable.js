import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';

export function initializeClassScheduleDatatable() {
// console.log("Class Schedule page function triggered.");

    /* Submit Class Schedule Modal Form */

    const form = document.getElementById('add-class-schedule-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let formData = new FormData(form);

            axios.post(`/teacher/sections/${sectionSlug}/class-schedules`, formData)
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
                        title: "Class Schedule record added successfully!"
                    });

                    form.reset();
                    window.location.href = `/teacher/sections/${sectionSlug}/class-schedules`;
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

    /* Get Class Schedules with Days of Weeks (eager loaded) for a specific section */

    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get(`/teacher/sections/${sectionSlug}/class-schedules-list`)
        .then(response => {
            const classSchedules = response.data;

            /* Datatable */

            if (classSchedules.length > 0) {
                const tableHTML = `
                <table id="classScheduleTable" class="bg-gray-50 dark:bg-gray-800">
                    <thead>
                        <tr>
                            <th>
                                <span class="flex items-center">
                                    Subject
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Subject Code
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Start Time
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    End Time
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Days
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

                document.getElementById('class-schedule-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#classScheduleTable tbody');
                tbody.innerHTML = '';

                function convertToAmPm(time) {
                    const [hours, minutes] = time.split(':');
                    const suffix = hours >= 12 ? 'PM' : 'AM';
                    const adjustedHours = hours % 12 || 12; // Adjust hours to 12-hour format
                    return `${adjustedHours}:${minutes} ${suffix}`;
                }

                classSchedules.forEach(classSchedule => {
                    const row = document.createElement('tr');
                
                    const startTime = convertToAmPm(classSchedule.start_time);
                    const endTime   = convertToAmPm(classSchedule.end_time);

                    // Map specific days to specific badge color classes
                    const dayColorMap = {
                        'Monday': 'bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400',
                        'Tuesday': 'bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300',
                        'Wednesday': 'bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400',
                        'Thursday': 'bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400 border border-purple-400',
                        'Friday': 'bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400 border border-pink-400',
                        'Saturday': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-500',
                        'Sunday': 'bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-red-400',
                    };

                    // Create badges for each day of the week with text inside
                    const days = classSchedule.days_of_week.map(day => {
                        const span = document.createElement('span');
                        
                        // Get the corresponding badge class based on the day name
                        const badgeClass = dayColorMap[day.day_name] || 'bg-gray-100 text-gray-800'; // Default to gray if day is not found
                        
                        // Assign class and add text inside the badge
                        span.className   = `text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`;
                        span.textContent = day.day_name; // This ensures the text is inside the badge
                        return span.outerHTML;
                    }).join(' ')

                    row.innerHTML = `
                        <td>${classSchedule.subject}</td>
                        <td>${classSchedule.subject_code}</td>
                        <td>${startTime}</td>
                        <td>${endTime}</td>
                        <td>
                        ${days}
                        </td>
                        <td>
                            <button type="button" data-modal-target="edit-class-schedule-modal" data-modal-toggle="edit-class-schedule-modal" class="text-blue-500 hover:underline" data-class-schedule-id="${classSchedule.id}">
                                <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                                </svg>
                            </button> 
                            <button type="button" data-modal-target="delete-class-schedule-modal" data-modal-toggle="delete-class-schedule-modal" class="text-red-500 hover:underline" data-class-schedule-id="${classSchedule.id}">
                                <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                new DataTable('#classScheduleTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none';

            } else {
                const tableHTML = `
                    <table id="classScheduleTable" class="bg-gray-50 dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th>
                                    <span class="flex items-center">
                                        Subject
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Subject Code
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Start Time
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        End Time
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Days
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

                document.getElementById('class-schedule-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#classScheduleTable tbody');
                tbody.innerHTML = '';

                new DataTable('#classScheduleTable', {
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

        /* Get Days of Weeks data */

        axios.get(`/teacher/sections/${sectionSlug}/days-of-weeks-list`)
        .then(response => {
            const daysOfWeeks = response.data;
    
            // Clear out any existing options before populating
            const selectElement = document.getElementById('days_of_weeks');
            selectElement.innerHTML = '';
    
            if (daysOfWeeks.length > 0) {
                // Loop through the days and add them as options to the select element
                daysOfWeeks.forEach(daysOfWeek => {
                    const option = document.createElement('option');
                    option.value = daysOfWeek.id;  // id value
                    option.text = daysOfWeek.day_name; // Display the day name
    
                    selectElement.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching days of the week:", error);
        });
    }


    /* Edit GET Request - Modal Instance */

    const editClassScheduleModalContainer = document.getElementById('edit-class-schedule-modal-container');

    const editClassScheduleModal = `
        <div id="edit-class-schedule-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Class Schedule
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-class-schedule-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                    </div>
                    <div class="p-4 md:p-5 space-y-4">   
                    <form id="edit-class-schedule-form">
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                <input type="text" id="edit_subject" name="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Subject" />
                            </div>
                            <div>
                                <label for="subject_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Code</label>
                                <input type="text" id="edit_subject_code" name="subject_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Subject Code" />
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="start_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time:</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input type="time" id="edit_start_time" name="start_time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="07:00" max="17:00" />
                                </div>
                            </div>
                            <div>
                                <label for="end_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time:</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input type="time" id="edit_end_time" name="end_time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="07:00" max="17:00" />
                                </div>
                            </div>
                        </div>
                        <div class="grid mb-6 md:grid-cols-1">
                            <label for="days_of_weeks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days of Weeks</label>
                            <select multiple id="edit_days_of_weeks" name="days_of_weeks[]" size="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </select>

                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal HTML into the container
    editClassScheduleModalContainer.innerHTML = editClassScheduleModal;

    const editClassScheduleModalEl = document.getElementById('edit-class-schedule-modal');

    let classScheduleId;

    if (editClassScheduleModalEl) {
        const editClassScheduleModal = new Modal(editClassScheduleModalEl);

        document.addEventListener('click', function (e) {
            // Ensure the click targets a button with the correct data-modal-toggle attribute
            if (e.target.closest('[data-modal-toggle="edit-class-schedule-modal"]')) {
                e.preventDefault();

                classScheduleId = e.target.closest('button').getAttribute('data-class-schedule-id');

                editClassScheduleModal.show();

                axios.get(`/teacher/sections/${sectionSlug}/days-of-weeks-list`)
                .then(response => {
                    const allDaysOfWeeks = response.data;  // Fetch predefined days of week
                    
                    // Fetch the class schedule and pre-select the associated days
                    axios.get(`/teacher/sections/${sectionSlug}/class-schedules/${classScheduleId}/edit`)
                    .then(scheduleResponse => {
                        const classScheduleData = scheduleResponse.data;

                        document.querySelector('#edit_subject').value       = classScheduleData.subject;
                        document.querySelector('#edit_subject_code').value  = classScheduleData.subject_code;
                        document.querySelector('#edit_start_time').value    = classScheduleData.start_time;
                        document.querySelector('#edit_end_time').value      = classScheduleData.end_time;

                        const selectElement = document.querySelector('#edit_days_of_weeks');
                        selectElement.innerHTML = '';

                        // Pre-selected days from class schedule
                        const selectedDaysOfWeeks = classScheduleData.days_of_week.map(d => d.id);

                        // Populate all days of week, pre-select the associated ones
                        allDaysOfWeeks.forEach(daysOfWeek => {
                            const option = document.createElement('option');
                            option.value = daysOfWeek.id;
                            option.text = daysOfWeek.day_name;

                            // Mark as selected if it's part of the class schedule
                            if (selectedDaysOfWeeks.includes(daysOfWeek.id)) {
                                option.selected = true;
                            }

                            selectElement.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error("Error fetching class schedule data:", error);
                    });
                })
                .catch(error => {
                    console.error("Error fetching days of the week:", error);
                });
            }
 
            // Hide modal
            if (e.target.closest('[data-modal-hide="edit-class-schedule-modal"]')) {
                editClassScheduleModal.hide();
            }
        });
    }

    /* Edit PUT Request - FORM */
    const editForm = document.getElementById('edit-class-schedule-form');

    if (editForm) {
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            let formData = new FormData(editForm);

            axios.post(`/teacher/sections/${sectionSlug}/class-schedules/${classScheduleId}`, formData, {
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
                    title: "Class Schedule record updated successfully!"
                });

                editForm.reset();
                window.location.href = `/teacher/sections/${sectionSlug}/class-schedules`;
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation

                    for (let key in errors) {
                        let inputElement = document.getElementById(`edit_${key}`);
                        let errorMessage = errors[key];

                        let errorElement = document.createElement('p');
                        errorElement.classList.add('text-red-500', 'text-xs', 'mt-1', 'error-message');
                        errorElement.innerText = errorMessage;

                        inputElement.after(errorElement);
                    }
                }
            });
        });
    }

    /* Delete - Modal Instance */

    const deleteClassScheduleModalContainer = document.getElementById('delete-class-schedule-modal-container');

    if (deleteClassScheduleModalContainer) {
        let classScheduleId; // To hold the ID of the section to delete

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-class-schedule-modal"]')) {
                e.preventDefault();
                
                classScheduleId = e.target.closest('button').getAttribute('data-class-schedule-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="delete-class-schedule-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 flex justify-center items-center" data-modal-hide="delete-class-schedule-modal">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-6 text-center">
                                    <svg class="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Delete Class Schedule?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including class schedule and students attendance records will be permanently removed. This action cannot be undone.</p>
                                    <div class="flex justify-center space-x-3">
                                        <form action="">
                                            <button type="submit" id="delete-class-schedule-confirm-btn" data-modal-hide="delete-class-schedule-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-class-schedule-cancel-btn" data-modal-hide="delete-class-schedule-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteClassScheduleModalContainer.innerHTML = modalHTML;

                // Show the modal
                const deleteClassScheduleModalEl = document.getElementById('delete-class-schedule-modal');
                const deleteClassScheduleModal = new Modal(deleteClassScheduleModalEl);
                deleteClassScheduleModal.show();

                // Handle confirmation
                document.querySelector('#delete-class-schedule-confirm-btn').addEventListener('click', function (e) {
                    e.preventDefault();

                    if (classScheduleId) {
                        axios.delete(`/teacher/sections/${sectionSlug}/class-schedules/${classScheduleId}`)
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
                                title: "Class Schedule record deleted successfully!"
                            });

                            window.location.href = `/teacher/sections/${sectionSlug}/class-schedules`;
                        })
                        .catch(error => {
                            console.error('There was an error deleting the class schedule:', error);
                        });
                    }
                });

                // Handle modal close
                document.querySelector('[data-modal-hide="delete-class-schedule-modal"]').addEventListener('click', function () {
                    deleteClassScheduleModal.hide();
                    deleteClassScheduleModalContainer.innerHTML = ''; // Clear modal content
                });

                document.querySelector('#delete-class-schedule-cancel-btn').addEventListener('click', function (e) {
                    deleteClassScheduleModal.hide();
                    deleteClassScheduleModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }
}
