import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { refreshIcons } from "../icons";

/* Shared table markup for both branches (with / without schedules). */
const classScheduleTable = `
    <div class="relative overflow-x-auto">
        <table id="classScheduleTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-4 py-3">Subject</th>
                    <th scope="col" class="px-4 py-3">Subject Code</th>
                    <th scope="col" class="px-4 py-3">Start Time</th>
                    <th scope="col" class="px-4 py-3">End Time</th>
                    <th scope="col" class="px-4 py-3">Days</th>
                    <th scope="col" class="px-4 py-3">Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>`;

const classScheduleEmptyState = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <i data-lucide="calendar-days" class="h-6 w-6"></i>
        </span>
        <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No class schedules yet</h4>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Add a class schedule to start tracking attendance for this section.</p>
    </div>`;

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
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'dark:text-red-400', 'error-message');
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
                document.getElementById('class-schedule-datatable-container').innerHTML = classScheduleTable;
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

                    row.className = 'border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50';
                    row.innerHTML = `
                        <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">${classSchedule.subject}</td>
                        <td class="px-4 py-3">${classSchedule.subject_code}</td>
                        <td class="px-4 py-3 whitespace-nowrap">${startTime}</td>
                        <td class="px-4 py-3 whitespace-nowrap">${endTime}</td>
                        <td class="px-4 py-3">
                        ${days}
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-1">
                                <button type="button" data-modal-target="edit-class-schedule-modal" data-modal-toggle="edit-class-schedule-modal" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400" data-class-schedule-id="${classSchedule.id}">
                                    <span class="sr-only">Edit class schedule</span>
                                    <i data-lucide="pencil" class="h-4 w-4"></i>
                                </button>
                                <button type="button" data-modal-target="delete-class-schedule-modal" data-modal-toggle="delete-class-schedule-modal" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400" data-class-schedule-id="${classSchedule.id}">
                                    <span class="sr-only">Delete class schedule</span>
                                    <i data-lucide="trash-2" class="h-4 w-4"></i>
                                </button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                refreshIcons();

                new DataTable('#classScheduleTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 10,
                });

                document.getElementById('table-loader').style.display = 'none';

            } else {
                document.getElementById('class-schedule-datatable-container').innerHTML = classScheduleEmptyState;
                refreshIcons();

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
                <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit Class Schedule
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-class-schedule-modal">
                            <span class="sr-only">Close modal</span>
                            <i data-lucide="x" class="h-3.5 w-3.5"></i>
                        </button>
                    </div>
                    <div class="p-4 md:p-5">
                        <form id="edit-class-schedule-form" class="space-y-6">
                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="edit_subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                    <input type="text" id="edit_subject" name="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Subject" />
                                </div>
                                <div>
                                    <label for="edit_subject_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Code</label>
                                    <input type="text" id="edit_subject_code" name="subject_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Subject Code" />
                                </div>
                            </div>
                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="edit_start_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <i data-lucide="clock" class="h-4 w-4 text-gray-500 dark:text-gray-400"></i>
                                        </div>
                                        <input type="time" id="edit_start_time" name="start_time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" min="00:00" max="24:00" />
                                    </div>
                                </div>
                                <div>
                                    <label for="edit_end_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <i data-lucide="clock" class="h-4 w-4 text-gray-500 dark:text-gray-400"></i>
                                        </div>
                                        <input type="time" id="edit_end_time" name="end_time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" min="00:00" max="24:00" />
                                    </div>
                                </div>
                            </div>
                            <div class="grid mb-6 md:grid-cols-1">
                                <label for="edit_days_of_weeks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days of Weeks</label>
                                <select multiple id="edit_days_of_weeks" name="days_of_weeks[]" size="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                </select>
                            </div>
                            <div class="flex items-center gap-3">
                                <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Changes</button>
                                <button type="button" data-modal-hide="edit-class-schedule-modal" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal HTML into the container
    editClassScheduleModalContainer.innerHTML = editClassScheduleModal;
    refreshIcons();

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
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'dark:text-red-400', 'error-message');
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
                            <div class="relative bg-white rounded-xl shadow-lg dark:bg-gray-800">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-class-schedule-modal">
                                    <span class="sr-only">Close modal</span>
                                    <i data-lucide="x" class="h-4 w-4"></i>
                                </button>
                                <div class="p-6 text-center">
                                    <span class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-600/10 dark:text-red-400">
                                        <i data-lucide="circle-alert" class="h-6 w-6"></i>
                                    </span>
                                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Delete this class schedule?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including class schedule and students attendance records will be permanently removed. This action cannot be undone.</p>
                                    <div class="flex justify-center gap-3">
                                        <form action="">
                                            <button type="submit" id="delete-class-schedule-confirm-btn" data-modal-hide="delete-class-schedule-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-class-schedule-cancel-btn" data-modal-hide="delete-class-schedule-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteClassScheduleModalContainer.innerHTML = modalHTML;
                refreshIcons();

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
