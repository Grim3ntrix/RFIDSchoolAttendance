import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';

export function initializeTeacherDatatable() {

    /* This is important para dle mag conflict ag uban JS code "EH LOAD SA DOM -> DOMContentLoaded" */

    document.addEventListener('DOMContentLoaded', () => {

        /* Add teacher modal behaviour and prevent Close after submit button is click */

        const form = document.getElementById('add-teacher-form');
    
        form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        let formData = new FormData(form);

        axios.post('/superadmin/teachers', formData)
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
            
                setTimeout(() => {
                    form.reset();
                    window.location.href = '/superadmin/teachers';
                }, 800);
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

        // Show Loading spinner
        document.getElementById('table-loader').style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get('/superadmin/teachers/records')
        .then(response => {
            const teachers = response.data;

            /* Datatable */

            if (teachers.length > 0) {
                const tableHTML = `
                <table id="teacherTable" class="bg-gray-50 dark:bg-gray-800">
                    <thead>
                        <tr>
                            <th>
                                <span class="flex items-center">
                                    Teacher ID
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Name
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Sex
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Birthdate
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Address
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Email
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Phone
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

                document.getElementById('teacher-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#teacherTable tbody');
                tbody.innerHTML = '';
                
                teachers.forEach(teacher => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${teacher.teacher_id}</td>
                        <td>${teacher.first_name} ${teacher.middle_name} ${teacher.last_name} ${teacher.name_extension ?? ''}</td>
                        <td>${teacher.sex}</td>
                        <td>${teacher.birth_date ?? 'N/A'}</td>
                        <td>${teacher.address}</td>
                        <td>${teacher.email ?? 'N/A'}</td>
                        <td>${teacher.phone_number}</td>
                        <td>
                            <button type="button" data-modal-target="edit-teacher-modal" data-modal-toggle="edit-teacher-modal" class="text-blue-500 hover:underline" data-teacher-id="${teacher.id}">
                                <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                                </svg>
                            </button> 
                            <button type="button" data-modal-target="delete-teacher-modal" data-modal-toggle="delete-teacher-modal" class="text-red-500 hover:underline" data-teacher-id="${teacher.id}">
                                <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                new DataTable('#teacherTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none';

            } else {
                const tableHTML = `
                <table id="teacherTable" class="bg-gray-50 dark:bg-gray-800">
                    <thead>
                        <tr>
                            <th>
                                <span class="flex items-center">
                                    Teacher ID
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Name
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Sex
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Birthdate
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Address
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Email
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Phone
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

                document.getElementById('teacher-datatable-container').innerHTML = tableHTML;
                const tbody = document.querySelector('#teacherTable tbody');
                tbody.innerHTML = '';

                new DataTable('#teacherTable', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
            }

        })
        .catch(error => {
            console.error('Error fetching teacher data:', error);
            document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
        });

        /* Edit GET Request - Modal Instance */
 
        const editTeacherModalEl = document.getElementById('edit-teacher-modal');

        if (editTeacherModalEl) {
            const editTeacherModal = new Modal(editTeacherModalEl);

            document.addEventListener('click', function (e) {
                // Ensure the click targets a button with the correct data-modal-toggle attribute
                if (e.target.closest('[data-modal-toggle="edit-teacher-modal"]')) {
                    e.preventDefault();

                    const teacherId = e.target.closest('button').getAttribute('data-teacher-id');

                    editTeacherModal.show();

                    axios.get(`/superadmin/teachers/${teacherId}/edit`)
                    .then(response => {
                        const teacherData = response.data;
                        document.querySelector('#teacher_record_id').value  = teacherData.id;
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
            });
        }

        /* Edit PUT Request - FORM */

        const editForm = document.getElementById('edit-teacher-form');

        editForm.addEventListener('submit', function (e) {
            e.preventDefault();
        
            const teacherId = document.querySelector('#teacher_record_id').value;
            let formData = new FormData(editForm);
        
            axios.post(`/superadmin/teachers/${teacherId}`, formData, {
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
        
                setTimeout(() => {
                    editForm.reset();
                    window.location.href = '/superadmin/teachers'; // Redirect or update the UI
                }, 800);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;
        
                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation
        
                    for (let key in errors) {
                        let inputElement = document.getElementById(`edit_${key}`);
                        let errorMessage = errors[key][0];
        
                        let errorElement = document.createElement('p');
                        errorElement.classList.add('text-red-500', 'text-xs', 'mt-1', 'error-message');
                        errorElement.innerText = errorMessage;
        
                        inputElement.after(errorElement);
                    }
                }
            });
        });

        /* Delete - Modal Instance */

        const deleteTeacherModalEl = document.getElementById('delete-teacher-modal');

        if (deleteTeacherModalEl) {
            const deleteTeacherModal = new Modal(deleteTeacherModalEl);
            let teacherIdToDelete = null; // Variable to hold the teacher ID to be deleted, so that we can use it in the url

            document.addEventListener('click', function (e) {
                if (e.target.closest('[data-modal-toggle="delete-teacher-modal"]')) {
                    e.preventDefault();

                    teacherIdToDelete = e.target.closest('button').getAttribute('data-teacher-id');
                    console.log('Teacher ID to delete:', teacherIdToDelete);

                    deleteTeacherModal.show();
                }
            });

            // Handle confirmation
            document.querySelector('#delete-teacher-confirm-btn').addEventListener('click', function (e) {
                e.preventDefault();

                if (teacherIdToDelete) {
                    axios.delete(`/superadmin/teachers/${teacherIdToDelete}`)
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

                            setTimeout(() => {
                                window.location.href = '/superadmin/teachers'; // Redirect or update the UI
                            }, 800);
                        })
                        .catch(error => {
                            console.error('There was an error deleting the teacher:', error);
                        });
                }
            });
        }
    });
}
