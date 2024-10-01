import Swal from 'sweetalert2';

export function initializeSectionPage() {
    console.log("Add section page function triggered.");

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
                        errorElement.classList.add('text-red-500', 'text-xs', 'mt-1', 'error-message');
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
                    <div class="flex justify-between items-center rounded-lg shadow p-4 cursor-pointer bg-gradient-to-r from-lime-200 to-green-400 hover:text-white text-gray-800 duration-50 ease-in-out hover:bg-gradient-to-r hover:from-emerald-500 hover:to-lime-500">
                        
                        <!-- Section Content -->
                        <div class="section-info flex items-center space-x-3">
                            <p class="subpixel-antialiased font-lg font-semibold">
                                ${section.section_name}
                            </p>
                            
                            <span class="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                ${section.grade_or_year_level}
                            </span>
                        </div>

                        <!-- Button Group -->
                        <div class="section-actions flex space-x-2">

                            <!-- Manage Student Button -->
                            <button type="button" class="w-15 font-medium rounded-md text-sm p-0.5 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" data-section-id="${section.id}">
                            <a href="/teacher/sections/${section.slug}/students">
                                    <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                                    </svg>
                                </a>
                            </button>

                            <!-- Manage Class Schedule Button -->
                            <button type="button" class="w-15 font-medium rounded-md text-sm p-0.5 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" data-section-id="${section.id}">
                                <a href="/teacher/sections/${section.slug}/class-schedules">
                                    <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M4 9.05H3v2h1v-2Zm16 2h1v-2h-1v2ZM10 14a1 1 0 1 0 0 2v-2Zm4 2a1 1 0 1 0 0-2v2Zm-3 1a1 1 0 1 0 2 0h-2Zm2-4a1 1 0 1 0-2 0h2Zm-2-5.95a1 1 0 1 0 2 0h-2Zm2-3a1 1 0 1 0-2 0h2Zm-7 3a1 1 0 0 0 2 0H6Zm2-3a1 1 0 1 0-2 0h2Zm8 3a1 1 0 1 0 2 0h-2Zm2-3a1 1 0 1 0-2 0h2Zm-13 3h14v-2H5v2Zm14 0v12h2v-12h-2Zm0 12H5v2h14v-2Zm-14 0v-12H3v12h2Zm0 0H3a2 2 0 0 0 2 2v-2Zm14 0v2a2 2 0 0 0 2-2h-2Zm0-12h2a2 2 0 0 0-2-2v2Zm-14-2a2 2 0 0 0-2 2h2v-2Zm-1 6h16v-2H4v2ZM10 16h4v-2h-4v2Zm3 1v-4h-2v4h2Zm0-9.95v-3h-2v3h2Zm-5 0v-3H6v3h2Zm10 0v-3h-2v3h2Z"/>
                                    </svg>
                                </a>
                            </button>
                            
                            <!-- Edit Button -->
                            <button type="button" data-modal-target="edit-section-modal" data-modal-toggle="edit-section-modal" class="w-15 font-medium rounded-md text-sm p-0.5 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" data-section-id="${section.id}">
                                <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                                </svg>
                            </button>

                            <!-- Delete Button -->
                            <button type="button" data-modal-target="delete-section-modal" data-modal-toggle="delete-section-modal" class="w-15 font-medium rounded-md text-sm p-0.5 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" data-section-id="${section.id}">
                                <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>

                    </div>
                `;

                sectionsContainer.innerHTML += sectionContent;
            });
        }
        })
        .catch(error => console.error('Error fetching sections:', error));
    }

    /* Edit GET Request - Modal Instance */

    const editSectionModalContainer = document.getElementById('edit-section-modal-container');

    const editSectionModal = `
        <div id="edit-section-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Edit Section</h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-section-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                    <div class="p-4 md:p-5 space-y-4">   
                        <form id="edit-sections-form">
                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="edit_section_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
                                    <input type="text" name="section_name" id="edit_section_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Section Name" />
                                </div>
                                <div>
                                    <label for="edit_grade_or_year_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                                    <input type="text" name="grade_or_year_level" id="edit_grade_or_year_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Grade or/ Year Level" />
                                </div>
                            </div>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal HTML into the container
    editSectionModalContainer.innerHTML = editSectionModal;

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
                        errorElement.classList.add('text-red-500', 'text-xs', 'mt-1', 'error-message');
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
                            <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center" data-modal-hide="delete-section-modal">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-6 text-center">
                                    <svg class="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Delete Section?</h3>
                                    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including students, class schedules, and attendance records will be permanently removed. This action cannot be undone.</p>
                                    <div class="flex justify-center space-x-3">
                                        <form action="">
                                            <button type="submit" id="delete-section-confirm-btn" data-modal-hide="delete-section-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                                                Yes, Delete
                                            </button>
                                        </form>
                                        <button id="delete-section-cancel-btn" data-modal-hide="delete-section-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                // Inject the modal into the container
                deleteSectionModalContainer.innerHTML = modalHTML;

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