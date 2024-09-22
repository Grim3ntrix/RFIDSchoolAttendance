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
            
                setTimeout(() => {
                    form.reset();
                    window.location.href = '/teacher/sections';
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
    }

    const sectionsContainer = document.getElementById('added-sections-container');

if (sectionsContainer) {
    axios.get('/teacher/sections/records')
    .then(response => {
    const sections = response.data;

    if (sections.length > 0) {
        sections.forEach(section => {
            const sectionContent = `
                <div class="flex justify-between items-center rounded-lg shadow p-4 cursor-pointer bg-white hover:text-white text-gray-800 duration-50 ease-in-out hover:bg-gradient-to-r hover:from-emerald-500 hover:to-lime-500">
                    
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

                        <!-- Add Student Button -->
                        <button type="button" data-modal-target="edit-section-modal" data-modal-toggle="edit-section-modal" class="w-15 font-medium rounded-md text-sm p-0.5 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" data-section-id="${section.id}">
                            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"/>
                            </svg>
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

    const editSectionModalEl = document.getElementById('edit-section-modal');

    let sectionId;

    if (editSectionModalEl) {
        const editSectionModal = new Modal(editSectionModalEl);

        document.addEventListener('click', function (e) {
            // Ensure the click targets a button with the correct data-modal-toggle attribute
            if (e.target.closest('[data-modal-toggle="edit-section-modal"]')) {
                e.preventDefault();

                sectionId = e.target.closest('button').getAttribute('data-section-id');

                editSectionModal.show();

                axios.get(`/teacher/sections/${sectionId}/edit`)
                .then(response => {
                    const sectionData = response.data;
                    document.querySelector('#edit_section_name').value         = sectionData.section_name;
                    document.querySelector('#edit_grade_or_year_level').value  = sectionData.grade_or_year_level;
                })
                .catch(error => {
                    console.error('There was an error fetching the section data:', error);
                });
            }
        });
    }

    /* Edit PUT Request - FORM */

    const editForm = document.getElementById('edit-sections-form');

    if (editForm){
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();
        
            let formData = new FormData(editForm);
        
            axios.post(`/teacher/sections/${sectionId}`, formData, {
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
                    title: "Section record updated successfully!"
                });
        
                setTimeout(() => {
                    editForm.reset();
                    window.location.href = '/teacher/sections'; // Redirect or update the UI
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
    }

    /* Delete - Modal Instance */

    const deleteSectionModalEl = document.getElementById('delete-section-modal');

    if (deleteSectionModalEl) {
        const deleteSectionModal = new Modal(deleteSectionModalEl);
        let sectionId; // Reinitialize because this time the delete is click not the edit button

        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-section-modal"]')) {
                e.preventDefault();

                sectionId = e.target.closest('button').getAttribute('data-section-id');
                // console.log('Section ID to delete:', sectionId); 

                deleteSectionModal.show();
            }
        });

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

                    setTimeout(() => {
                        window.location.href = '/teacher/sections'; // Redirect or update the UI
                    }, 800);
                })
                .catch(error => {
                    console.error('There was an error deleting the section:', error);
                });
            }
        });
    }

}