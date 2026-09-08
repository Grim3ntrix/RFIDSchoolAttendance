import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { refreshIcons } from '../icons';

export function initializeTeacherDatatable() {
    // console.log("Pre register teacher page function triggered.");

    /* Pre-register teacher modal behaviour and prevent Close after submit button is click */

    const form = document.getElementById('add-teacher-form');

    if (form){
        form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        let formData = new FormData(form);

        axios.post('/superadmin/pre-registered-teachers', formData)
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
                    title: "Teacher record added successfully!"
                });

                form.reset();
                window.location.href = '/superadmin/pre-registered-teachers';
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {

                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation

                    for (let key in errors) {
                        let inputElement = document.getElementById(key);
                        let errorMessage = errors[key][0];

                        let errorElement = document.createElement('p');
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'error-message', 'dark:text-red-400');
                        errorElement.innerText = errorMessage;

                        inputElement.after(errorElement);
                    }
                }
            });
        });
    }

    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get('/superadmin/pre-registered-teachers/records')
        .then(response => {
            const teachers = response.data;

            /* Datatable */

            if (teachers.length > 0) {
                const tableHTML = `
                    <div class="relative overflow-x-auto">
                        <table id="teacherTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-4 py-3">Teacher ID</th>
                                    <th scope="col" class="px-4 py-3">Full Name</th>
                                    <th scope="col" class="px-4 py-3">Sex</th>
                                    <th scope="col" class="px-4 py-3">Birthdate</th>
                                    <th scope="col" class="px-4 py-3">Address</th>
                                    <th scope="col" class="px-4 py-3">Email</th>
                                    <th scope="col" class="px-4 py-3">Phone</th>
                                    <th scope="col" class="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>`;

                document.getElementById('teacher-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#teacherTable tbody');
                tbody.innerHTML = '';

                teachers.forEach(teacher => {
                    const row = document.createElement('tr');
                    row.className = 'border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50';
                    row.innerHTML = `
                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${teacher.teacher_id}</td>
                        <td class="px-4 py-3 text-gray-900 dark:text-white">${teacher.first_name} ${teacher.middle_name ?? ''} ${teacher.last_name} ${teacher.name_extension ?? ''}</td>
                        <td class="px-4 py-3 capitalize">${teacher.sex}</td>
                        <td class="px-4 py-3 whitespace-nowrap">${teacher.birth_date ?? 'N/A'}</td>
                        <td class="px-4 py-3 max-w-xs truncate" title="${teacher.address}">${teacher.address}</td>
                        <td class="px-4 py-3">${teacher.email ?? 'N/A'}</td>
                        <td class="px-4 py-3 whitespace-nowrap">${teacher.phone_number}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-1">
                                <button type="button" data-modal-target="edit-teacher-modal" data-modal-toggle="edit-teacher-modal" data-teacher-id="${teacher.id}" title="Edit teacher"
                                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                    <span class="sr-only">Edit</span>
                                </button>
                                <button type="button" data-modal-target="delete-teacher-modal" data-modal-toggle="delete-teacher-modal" data-teacher-id="${teacher.id}" title="Delete teacher"
                                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    <span class="sr-only">Delete</span>
                                </button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                /* Convert <i data-lucide> placeholders before the DataTable
                   takes a copy of the row markup for its re-renders. */
                refreshIcons();

                new DataTable('#teacherTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none';

            } else {
                const emptyStateHTML = `
                    <div class="flex flex-col items-center justify-center px-4 py-16 text-center">
                        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                            <i data-lucide="users" class="w-7 h-7 text-gray-500 dark:text-gray-400"></i>
                        </div>
                        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">No pre-registered teachers yet.</h3>
                        <p class="max-w-md text-sm text-gray-500 dark:text-gray-400">Add a teacher to enable their registration as a new user.</p>
                    </div>`;

                document.getElementById('teacher-datatable-container').innerHTML = emptyStateHTML;
                refreshIcons();

                document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
            }
        })

        .catch(error => {
            console.error('Error fetching teacher data:', error);
            document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
        });
    }

    /* Edit GET Request - Modal Instance */

    const editTeacherModalContainer = document.getElementById('edit-teacher-modal-container');

    const editTeacherModal = `
        <div id="edit-teacher-modal" tabindex="-1" aria-hidden="true" class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
            <div class="relative max-h-full w-full max-w-2xl">
                <div class="relative rounded-xl bg-white shadow dark:bg-gray-800">
                    <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Teacher
                    </h3>
                    <button type="button" class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-teacher-modal">
                            <i data-lucide="x" class="w-3.5 h-3.5"></i>
                            <span class="sr-only">Close modal</span>
                    </button>
                    </div>
                    <div class="p-4 md:p-5">
                    <form method="POST" id="edit-teacher-form" class="space-y-6">
                        <div class="grid gap-6 md:grid-cols-3">
                            <div>
                                <label for="edit_first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input type="text" id="edit_first_name" name="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter First Name" />
                            </div>
                            <div>
                                <label for="edit_middle_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
                                <input type="text" id="edit_middle_name" name="middle_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Middle Name" />
                            </div>
                            <div>
                                <label for="edit_last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input type="text" id="edit_last_name" name="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Last Name" />
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-3">
                            <div>
                                <label for="edit_name_extension" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Extension</label>
                                <select id="edit_name_extension" name="name_extension" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="" selected disabled>Select an option</option>
                                <option value="">None</option>
                                <option value="Jr.">Jr.</option>
                                <option value="Sr.">Sr.</option>
                                <option value="II">II</option>
                                <option value="III">III</option>
                                <option value="IV">IV</option>
                                </select>
                            </div>
                            <div>
                                <label for="edit_teacher_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher ID</label>
                                <input type="text" id="edit_teacher_id" name="teacher_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Teacher ID" />
                            </div>

                            <div>
                                <label for="edit_sex" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sex</label>
                                <select id="edit_sex" name="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="" selected disabled>Select an option</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-3">
                            <div>
                                <label for="edit_birth_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
                                <input type="date" id="edit_birth_date" name="birth_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                            </div>
                            <div>
                                <label for="edit_email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" id="edit_email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Email" />
                            </div>
                            <div>
                                <label for="edit_phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input type="number" id="edit_phone_number" name="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Phone Number" />
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-1">
                            <div>
                                <label for="edit_address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" id="edit_address" name="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Address" />
                            </div>
                        </div>
                        <div class="flex items-center gap-3 pt-2">
                            <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Changes</button>
                            <button type="button" data-modal-hide="edit-teacher-modal" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal HTML into the container
    editTeacherModalContainer.innerHTML = editTeacherModal;
    refreshIcons();

    const editTeacherModalEl = document.getElementById('edit-teacher-modal');

    let teacherId;

    if (editTeacherModalEl) {
        const editTeacherModal = new Modal(editTeacherModalEl);

        document.addEventListener('click', function (e) {
            // Ensure the click targets a button with the correct data-modal-toggle attribute
            if (e.target.closest('[data-modal-toggle="edit-teacher-modal"]')) {
                e.preventDefault();

                teacherId = e.target.closest('button').getAttribute('data-teacher-id');

                editTeacherModal.show();

                axios.get(`/superadmin/pre-registered-teachers/${teacherId}/edit`)
                .then(response => {
                    const teacherData = response.data;
                    document.querySelector('#edit_last_name').value     = teacherData.last_name;
                    document.querySelector('#edit_first_name').value    = teacherData.first_name;
                    document.querySelector('#edit_middle_name').value   = teacherData.middle_name;
                    document.querySelector('#edit_name_extension').value= teacherData.name_extension;
                    document.querySelector('#edit_teacher_id').value    = teacherData.teacher_id;
                    document.querySelector('#edit_sex').value           = teacherData.sex;
                    document.querySelector('#edit_birth_date').value    = teacherData.birth_date;
                    document.querySelector('#edit_email').value         = teacherData.email;
                    document.querySelector('#edit_phone_number').value  = teacherData.phone_number;
                    document.querySelector('#edit_address').value       = teacherData.address;
                })
                .catch(error => {
                    console.error('There was an error fetching the teacher data:', error);
                });
            }

            // Hide modal
            if (e.target.closest('[data-modal-hide="edit-teacher-modal"]')) {
                editTeacherModal.hide();
            }
        });
    }

    /* Edit PUT Request - FORM */

    const editForm = document.getElementById('edit-teacher-form');

    if (editForm){
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let formData = new FormData(editForm);

            axios.post(`/superadmin/pre-registered-teachers/${teacherId}`, formData, {
                headers: {
                    'X-HTTP-Method-Override': 'PUT'
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
                    title: "Teacher record updated successfully!"
                });

                editForm.reset();
                window.location.href = '/superadmin/pre-registered-teachers';
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation

                    for (let key in errors) {
                        let inputElement = document.getElementById(`edit_${key}`);
                        let errorMessage = errors[key][0];

                        let errorElement = document.createElement('p');
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'error-message', 'dark:text-red-400');
                        errorElement.innerText = errorMessage;

                        inputElement.after(errorElement);
                    }
                }
            });
        });
    }

    /* Delete - Modal Instance */

    const deleteTeacherModalContainer = document.getElementById('delete-teacher-modal-container');

    if (deleteTeacherModalContainer) {
        let teacherId; // To hold the ID of the teacher record to delete

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-teacher-modal"]')) {
                e.preventDefault();

                teacherId = e.target.closest('button').getAttribute('data-teacher-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="delete-teacher-modal" tabindex="-1" class="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4">
                        <div class="relative max-h-full w-full max-w-md p-4 md:p-5">
                            <div class="relative rounded-xl bg-white shadow-lg dark:bg-gray-800">
                                <button type="button" class="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-teacher-modal">
                                    <i data-lucide="x" class="w-3.5 h-3.5"></i>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-6 text-center md:p-8">
                                    <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10">
                                        <i data-lucide="circle-alert" class="w-7 h-7 text-red-500 dark:text-red-400"></i>
                                    </div>
                                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Delete this teacher?</h3>
                                    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">This pre-registered teacher record will be permanently removed. This action cannot be undone.</p>
                                    <div class="flex justify-center gap-3">
                                        <form action="">
                                            <button type="submit" id="delete-teacher-confirm-btn" data-modal-hide="delete-teacher-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-teacher-cancel-btn" data-modal-hide="delete-teacher-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteTeacherModalContainer.innerHTML = modalHTML;
                refreshIcons();

                // Show the modal
                const deleteTeacherModalEl = document.getElementById('delete-teacher-modal');
                const deleteTeacherModal = new Modal(deleteTeacherModalEl);
                deleteTeacherModal.show();

                // Handle confirmation
                document.querySelector('#delete-teacher-confirm-btn').addEventListener('click', function (e) {
                    e.preventDefault();

                    if (teacherId) {
                        axios.delete(`/superadmin/pre-registered-teachers/${teacherId}`)
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
                                title: "Teacher record deleted successfully!"
                            });

                            window.location.href = '/superadmin/pre-registered-teachers';
                        })
                        .catch(error => {
                            console.error('There was an error deleting the teacher:', error);
                        });
                    }
                });

                // Handle modal close
                document.querySelector('[data-modal-hide="delete-teacher-modal"]').addEventListener('click', function () {
                    deleteTeacherModal.hide();
                    deleteTeacherModalContainer.innerHTML = ''; // Clear modal content
                });

                document.querySelector('#delete-teacher-cancel-btn').addEventListener('click', function (e) {
                    deleteTeacherModal.hide();
                    deleteTeacherModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }
}
