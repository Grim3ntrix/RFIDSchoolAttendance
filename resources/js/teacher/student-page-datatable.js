import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { refreshIcons } from "../icons";

/* Shared table markup for both branches (with / without records). */
const studentTable = `
    <div class="relative overflow-x-auto">
        <table id="studentTable" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-4 py-3">School ID</th>
                    <th scope="col" class="px-4 py-3">RFID Serial Number</th>
                    <th scope="col" class="px-4 py-3">Batch</th>
                    <th scope="col" class="px-4 py-3">Full Name</th>
                    <th scope="col" class="px-4 py-3">Sex</th>
                    <th scope="col" class="px-4 py-3">Phone Number</th>
                    <th scope="col" class="px-4 py-3">Address</th>
                    <th scope="col" class="px-4 py-3">Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>`;

const studentEmptyState = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <i data-lucide="users" class="h-6 w-6"></i>
        </span>
        <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No students yet</h4>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Add your first student to this section to start tracking attendance.</p>
    </div>`;

export function initializeStudentDatatable() {
    // console.log("Student page function triggered.");

    /* Add Students into specific section */

    const form = document.getElementById('add-student-form');

    if (form) {
        form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        let formData = new FormData(form);

        axios.post(`/teacher/sections/${sectionSlug}/students`, formData)
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
                    title: "Student record added successfully!"
                });

                form.reset();
                window.location.href = `/teacher/sections/${sectionSlug}/students`;
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation

                    for (let key in errors) {
                        let inputElement = document.getElementById(key);
                        let errorMessage = errors[key][0];

                        let errorElement = document.createElement('p');
                        errorElement.classList.add('mt-1', 'text-xs', 'text-red-600', 'dark:text-red-400', 'error-message');
                        errorElement.innerText = errorMessage;

                        inputElement.after(errorElement);
                    }
                }
            });
        });
    }

    /* Get Students for a specific section */

    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get(`/teacher/sections/${sectionSlug}/students/list`)
        .then(response => {
            const students = response.data;

            /* Datatable */

            if (students.length > 0) {
                document.getElementById('student-datatable-container').innerHTML = studentTable;
                const tbody = document.querySelector('#studentTable tbody');
                tbody.innerHTML = '';

                students.forEach(student => {
                    const row = document.createElement('tr');
                    row.className = 'border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50';
                    row.innerHTML = `
                        <td class="px-4 py-3">${student.school_id ?? 'N/A'}</td>
                        <td class="px-4 py-3">${student.rfid_serial_number}</td>
                        <td class="px-4 py-3">${student.batch}</td>
                        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.first_name} ${student.middle_name ?? ''} ${student.last_name} ${student.name_extension ?? ''}</td>
                        <td class="px-4 py-3">${student.sex}</td>
                        <td class="px-4 py-3">${student.phone_number ?? 'N/A'}</td>
                        <td class="px-4 py-3">${student.address ?? 'N/A'}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-1">
                                <button type="button" data-modal-target="edit-student-modal" data-modal-toggle="edit-student-modal" data-student-id="${student.id}" title="Edit student"
                                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                    <span class="sr-only">Edit ${student.first_name} ${student.last_name}</span>
                                    <i data-lucide="pencil" class="h-5 w-5"></i>
                                </button>
                                <button type="button" data-modal-target="delete-student-modal" data-modal-toggle="delete-student-modal" data-student-id="${student.id}" title="Delete student"
                                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400">
                                    <span class="sr-only">Delete ${student.first_name} ${student.last_name}</span>
                                    <i data-lucide="trash-2" class="h-5 w-5"></i>
                                </button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                refreshIcons();

                new DataTable('#studentTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 10,
                });

                document.getElementById('table-loader').style.display = 'none';

            } else {
                document.getElementById('student-datatable-container').innerHTML = studentEmptyState;
                refreshIcons();

                document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
            }
        })

        .catch(error => {
            console.error('Error fetching student data:', error);
            document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
        });
    }

    /* Edit GET Request - Modal Instance */

    const editStudentModalContainer = document.getElementById('edit-student-modal-container');

    const editStudentModal = `
        <div id="edit-student-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-4xl max-h-full">
                <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Edit Student</h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-student-modal">
                            <span class="sr-only">Close modal</span>
                            <i data-lucide="x" class="h-3.5 w-3.5"></i>
                        </button>
                    </div>
                    <div class="p-4 md:p-5">
                        <form id="edit-student-form" class="space-y-6">
                            <div class="grid gap-6 mb-6 md:grid-cols-4">
                                <div>
                                    <label for="edit_school_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School ID</label>
                                    <input type="text" id="edit_school_id" name="school_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter School ID" />
                                </div>
                                <div>
                                    <label for="edit_rfid_serial_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RFID Serial Number</label>
                                    <input type="text" id="edit_rfid_serial_number" name="rfid_serial_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="0000000000" />
                                </div>
                                <div>
                                    <label for="edit_batch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Batch</label>
                                    <input type="text" id="edit_batch" name="batch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Batch" />
                                </div>
                                <div>
                                    <label for="edit_phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <input type="number" id="edit_phone_number" name="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Phone Number" />
                                </div>
                            </div>
                            <div class="grid gap-6 mb-6 md:grid-cols-4">
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
                                <div>
                                    <label for="edit_name_extension" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Extension</label>
                                    <select id="edit_name_extension" name="name_extension" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected disabled>Select an option</option>
                                        <option value="">None</option>
                                        <option value="Jr.">Jr.</option>
                                        <option value="Sr.">Sr.</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                        <option value="IV">IV</option>
                                    </select>
                                </div>
                            </div>
                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="edit_sex" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sex</label>
                                    <select id="edit_sex" name="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected disabled>Select an option</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="edit_address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="text" id="edit_address" name="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autocomplete="off" placeholder="Enter Address" />
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Changes</button>
                                <button type="button" data-modal-hide="edit-student-modal" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal HTML into the container
    editStudentModalContainer.innerHTML = editStudentModal;
    refreshIcons();

    const editStudentModalEl = document.getElementById('edit-student-modal');

    let studentId;

    if (editStudentModalEl) {
        const editStudentModal = new Modal(editStudentModalEl);

        document.addEventListener('click', function (e) {
            // Ensure the click targets a button with the correct data-modal-toggle attribute
            if (e.target.closest('[data-modal-toggle="edit-student-modal"]')) {
                e.preventDefault();

                studentId = e.target.closest('button').getAttribute('data-student-id');

                editStudentModal.show();

                axios.get(`/teacher/sections/${sectionSlug}/students/${studentId}/edit`)
                .then(response => {
                    const studentData = response.data;
                    document.querySelector('#edit_school_id').value             = studentData.school_id;
                    document.querySelector('#edit_rfid_serial_number').value    = studentData.rfid_serial_number;
                    document.querySelector('#edit_batch').value                 = studentData.batch;
                    document.querySelector('#edit_phone_number').value          = studentData.phone_number;

                    document.querySelector('#edit_first_name').value            = studentData.first_name;
                    document.querySelector('#edit_middle_name').value           = studentData.middle_name;
                    document.querySelector('#edit_last_name').value             = studentData.last_name;
                    document.querySelector('#edit_name_extension').value        = studentData.name_extension;

                    document.querySelector('#edit_sex').value                   = studentData.sex;
                    document.querySelector('#edit_address').value               = studentData.address;

                })
                .catch(error => {
                    console.error('There was an error fetching the student data:', error);
                });
            }

            // Hide modal
            if (e.target.closest('[data-modal-hide="edit-student-modal"]')) {
                editStudentModal.hide();
            }
        });
    }

    /* Edit PUT Request - FORM */
    const editForm = document.getElementById('edit-student-form');

    if (editForm) {
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let formData = new FormData(editForm);

            axios.post(`/teacher/sections/${sectionSlug}/students/${studentId}`, formData, {
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
                    title: "Student record updated successfully!"
                });
                editForm.reset();
                window.location.href = `/teacher/sections/${sectionSlug}/students`;
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;

                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation

                    for (let key in errors) {
                        let inputElement = document.getElementById(`edit_${key}`);
                        let errorMessage = errors[key][0];

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

    const deleteStudentModalContainer = document.getElementById('delete-student-modal-container');

    if (deleteStudentModalContainer) {
        let studentId; // To hold the ID of the student to delete

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-student-modal"]')) {
                e.preventDefault();

                studentId = e.target.closest('button').getAttribute('data-student-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="delete-student-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-xl shadow-lg dark:bg-gray-800">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-student-modal">
                                    <span class="sr-only">Close modal</span>
                                    <i data-lucide="x" class="h-4 w-4"></i>
                                </button>
                                <div class="p-6 text-center">
                                    <span class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-600/10 dark:text-red-400">
                                        <i data-lucide="circle-alert" class="h-6 w-6"></i>
                                    </span>
                                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Delete this student?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including student and attendance records will be permanently removed. This action cannot be undone.</p>
                                    <div class="flex justify-center gap-3">
                                        <form action="">
                                            <button type="submit" id="delete-student-confirm-btn" data-modal-hide="delete-student-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-student-cancel-btn" data-modal-hide="delete-student-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteStudentModalContainer.innerHTML = modalHTML;
                refreshIcons();

                // Show the modal
                const deleteStudentModalEl = document.getElementById('delete-student-modal');
                const deleteStudentModal = new Modal(deleteStudentModalEl);
                deleteStudentModal.show();

                // Handle confirmation
                document.querySelector('#delete-student-confirm-btn').addEventListener('click', function (e) {
                    e.preventDefault();

                    if (studentId) {
                        axios.delete(`/teacher/sections/${sectionSlug}/students/${studentId}`)
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
                                title: "Student record deleted successfully!"
                            });

                            window.location.href = `/teacher/sections/${sectionSlug}/students`;
                        })
                        .catch(error => {
                            console.error('There was an error deleting the student:', error);
                        });
                    }
                });

                // Handle modal close
                document.querySelector('[data-modal-hide="delete-student-modal"]').addEventListener('click', function () {
                    deleteStudentModal.hide();
                    deleteStudentModalContainer.innerHTML = ''; // Clear modal content
                });

                document.querySelector('#delete-student-cancel-btn').addEventListener('click', function (e) {
                    deleteStudentModal.hide();
                    deleteStudentModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }
}
