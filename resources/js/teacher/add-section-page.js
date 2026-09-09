import Swal from 'sweetalert2';
import { refreshIcons } from "../icons";

export function initializeSectionPage() {
    // console.log("Add section page function triggered.");

    /* Submit Section Modal Form */

    const form = document.getElementById('add-section-form');

    if (form){
        form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        let formData = new FormData(form);

        axios.post('/teacher/sections', formData)
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
                    title: "Section record added successfully!"
                });

                form.reset();
                window.location.href = '/teacher/sections';
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

    const sectionsContainer = document.getElementById('sections-container');

    if (sectionsContainer) {
        axios.get('/teacher/sections/records')
        .then(response => {
        const sections = response.data;

        if (sections.length > 0) {
            sections.forEach(section => {
                const sectionContent = `
                    <div class="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-700 md:flex-row md:items-center">

                        <!-- Section Info -->
                        <div class="section-info flex flex-col items-center space-y-3 md:flex-row md:items-center md:space-x-3 md:space-y-0">
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">
                                ${section.section_name}
                            </p>
                            <span class="rounded-full bg-primary-50 px-2.5 py-0.5 text-sm font-medium text-primary-700 dark:bg-primary-600/10 dark:text-primary-400">
                                ${section.grade_or_year_level}
                            </span>
                        </div>

                        <!-- Button Group -->
                        <div class="section-actions flex flex-wrap justify-center gap-1">

                            <!-- Manage Student Button -->
                            <a href="/teacher/sections/${section.slug}/students" title="Manage students"
                                class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                <span class="sr-only">Manage students in ${section.section_name}</span>
                                <i data-lucide="users" class="h-5 w-5"></i>
                            </a>

                            <!-- Manage Class Schedule Button -->
                            <a href="/teacher/sections/${section.slug}/class-schedules" title="Manage class schedules"
                                class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                <span class="sr-only">Manage class schedules in ${section.section_name}</span>
                                <i data-lucide="calendar-days" class="h-5 w-5"></i>
                            </a>

                            <!-- Edit Button -->
                            <button type="button" data-modal-target="edit-section-modal" data-modal-toggle="edit-section-modal" data-section-id="${section.id}" title="Edit section"
                                class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                <span class="sr-only">Edit ${section.section_name}</span>
                                <i data-lucide="pencil" class="h-5 w-5"></i>
                            </button>

                            <!-- Delete Button -->
                            <button type="button" data-modal-target="delete-section-modal" data-modal-toggle="delete-section-modal" data-section-id="${section.id}" title="Delete section"
                                class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400">
                                <span class="sr-only">Delete ${section.section_name}</span>
                                <i data-lucide="trash-2" class="h-5 w-5"></i>
                            </button>
                        </div>
                    </div>
                `;

                sectionsContainer.innerHTML += sectionContent;
            });
        } else {
            sectionsContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <i data-lucide="school" class="h-6 w-6"></i>
                    </span>
                    <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No sections yet</h4>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Create your first section to start enrolling students.</p>
                </div>`;
        }

        refreshIcons();
        })
        .catch(error => console.error('Error fetching sections:', error));
    }

    /* Edit GET Request - Modal Instance */

    const editSectionModalContainer = document.getElementById('edit-section-modal-container');

    const editSectionModal = `
        <div id="edit-section-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-xl shadow dark:bg-gray-800">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Edit Section</h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-section-modal">
                            <span class="sr-only">Close modal</span>
                            <i data-lucide="x" class="h-3.5 w-3.5"></i>
                        </button>
                    </div>
                    <div class="p-4 md:p-5">
                        <form id="edit-sections-form" class="space-y-6">
                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="edit_section_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
                                    <input type="text" name="section_name" id="edit_section_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Section Name" />
                                </div>
                                <div>
                                    <label for="edit_grade_or_year_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                                    <input type="text" name="grade_or_year_level" id="edit_grade_or_year_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Grade or/ Year Level" />
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Changes</button>
                                <button type="button" data-modal-hide="edit-section-modal" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal HTML into the container
    editSectionModalContainer.innerHTML = editSectionModal;
    refreshIcons();

    const editSectionModalEl = document.getElementById('edit-section-modal');

    let sectionId;

    if (editSectionModalEl) {
        const editSectionModal = new Modal(editSectionModalEl);

        document.addEventListener('click', function (e) {
            // Show modal
            if (e.target.closest('[data-modal-toggle="edit-section-modal"]')) {
                e.preventDefault();

                sectionId = e.target.closest('button').getAttribute('data-section-id');

                editSectionModal.show();

                axios.get(`/teacher/sections/${sectionId}/edit`)
                .then(response => {
                    const sectionData = response.data;
                    document.querySelector('#edit_section_name').value = sectionData.section_name;
                    document.querySelector('#edit_grade_or_year_level').value = sectionData.grade_or_year_level;
                })
                .catch(error => {
                    console.error('There was an error fetching the section data:', error);
                });
            }

            // Hide modal
            if (e.target.closest('[data-modal-hide="edit-section-modal"]')) {
                editSectionModal.hide();
            }
        });
    }

    /* Edit PUT Request - FORM */
    const editForm = document.getElementById('edit-sections-form');

    if (editForm) {
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let formData = new FormData(editForm);

            axios.post(`/teacher/sections/${sectionId}`, formData, {
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
                    title: "Section record updated successfully!"
                });

                editForm.reset();
                window.location.href = '/teacher/sections';
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

    const deleteSectionModalContainer = document.getElementById('delete-section-modal-container');

    if (deleteSectionModalContainer) {
        let sectionId; // To hold the ID of the section to delete

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-section-modal"]')) {
                e.preventDefault();

                sectionId = e.target.closest('button').getAttribute('data-section-id');

                // Create modal HTML
                const modalHTML = `
                    <div id="delete-section-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-xl shadow-lg dark:bg-gray-800">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-section-modal">
                                    <span class="sr-only">Close modal</span>
                                    <i data-lucide="x" class="h-4 w-4"></i>
                                </button>
                                <div class="p-6 text-center">
                                    <span class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-600/10 dark:text-red-400">
                                        <i data-lucide="circle-alert" class="h-6 w-6"></i>
                                    </span>
                                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Delete this section?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including students, class schedules, and attendance records will be permanently removed. This action cannot be undone.</p>
                                    <div class="flex justify-center gap-3">
                                        <form action="">
                                            <button type="submit" id="delete-section-confirm-btn" data-modal-hide="delete-section-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-section-cancel-btn" data-modal-hide="delete-section-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteSectionModalContainer.innerHTML = modalHTML;
                refreshIcons();

                // Show the modal
                const deleteSectionModalEl = document.getElementById('delete-section-modal');
                const deleteSectionModal = new Modal(deleteSectionModalEl);
                deleteSectionModal.show();

                // Handle confirmation
                document.querySelector('#delete-section-confirm-btn').addEventListener('click', function (e) {
                    e.preventDefault();

                    if (sectionId) {
                        axios.delete(`/teacher/sections/${sectionId}`)
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
                                title: "Section record deleted successfully!"
                            });

                            window.location.href = '/teacher/sections';
                        })
                        .catch(error => {
                            console.error('There was an error deleting the section:', error);
                        });
                    }
                });

                // Handle modal close
                document.querySelector('[data-modal-hide="delete-section-modal"]').addEventListener('click', function () {
                    deleteSectionModal.hide();
                    deleteSectionModalContainer.innerHTML = ''; // Clear modal content
                });

                document.querySelector('#delete-section-cancel-btn').addEventListener('click', function (e) {
                    deleteSectionModal.hide();
                    deleteSectionModalContainer.innerHTML = ''; // Clear modal content
                });
            }
        });
    }

}
