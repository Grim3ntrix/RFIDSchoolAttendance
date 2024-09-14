import { DataTable } from "simple-datatables";

export function initializeClassScheduleDatatable() {

    const actionButtons = `
        <button type="button" data-modal-target="edit-subject-modal" data-modal-toggle="edit-subject-modal" class="text-blue-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
            </svg>
        </button> 
        <button type="button" data-modal-target="delete-subject-modal" data-modal-toggle="delete-subject-modal" class="text-red-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg>
        </button>
    `;

    const editSubjectModalEl = document.getElementById('edit-subject-modal');
    
    if (editSubjectModalEl) {
        const editSubjectModal = new Modal(editSubjectModalEl);
    
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="edit-subject-modal"]')) {
                e.preventDefault();
    
                editSubjectModal.show();
            }
        });
    }
    
    const deleteSubjectModalEl = document.getElementById('delete-subject-modal');
    
    if (deleteSubjectModalEl) {
        const deleteSubjectModal = new Modal(deleteSubjectModalEl); // Initialize the modal because we're not loaded it in the DOM
    
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-subject-modal"]')) {
                e.preventDefault();
    
                deleteSubjectModal.show();
            }
        });
    }

    const customData = {
        "data": [
            [
                "Physics",
                "Phy 201",
                "07:30 AM",
                "08:30 AM",
                "October 1, 2024",
                "October 1, 2024",
                `${actionButtons}`,
            ],
            [
                "Chemistry",
                "Chem 102",
                "09:00 AM",
                "10:30 AM",
                "October 1, 2024",
                "October 1, 2024",
                `${actionButtons}`,
            ],
            [
                "Biology",
                "Bio 101",
                "11:00 AM",
                "12:00 PM",
                "October 2, 2024",
                "October 2, 2024",
                `${actionButtons}`,
            ],
            [
                "History",
                "Hist 202",
                "01:00 PM",
                "02:30 PM",
                "October 2, 2024",
                "October 2, 2024",
                `${actionButtons}`,
            ],
            [
                "Computer Science",
                "CS 301",
                "03:00 PM",
                "04:30 PM",
                "October 3, 2024",
                "October 3, 2024",
                `${actionButtons}`,
            ],
            [
                "Philosophy",
                "Phil 101",
                "05:00 PM",
                "06:00 PM",
                "October 3, 2024",
                "October 3, 2024",
                `${actionButtons}`,
            ]
        ]
    };    

    // Initialize table with a loading spinner
    document.getElementById('table-loader').style.display = 'flex';

    setTimeout(() => {
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
                            Created At
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                            </svg>
                        </span>
                    </th>
                    <th>
                        <span class="flex items-center">
                            Updated At
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

        const dataTable = new DataTable("#classScheduleTable", {
            searchable: true,
            fixedHeight: true,
            sortable: true,
            perPage: 5,
            data: customData,
            });

                    
        document.getElementById('table-loader').style.display = 'none';

        const newSubjectHTML = `
            <button class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                <svg class="w-4 h-4 text-white mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <a href="#" class="btn btn-outline-primary hover:no-underline">Subject</a>
            </button>
        `;
        document.getElementById('add-subject-container').innerHTML = newSubjectHTML;

        const selectSectionHTML = `
        <form action="">
            <div id="import-student-container" class="mr-2">
            <form action="#" method="POST" enctype="multipart/form-data">
                <select id="default" class="ms-2 px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
                    <option selected disabled>Choose a Section</option>
                    <option value="US">Melon</option>
                    <option value="CA">Guava</option>
                    <option value="FR">Special Science Class (SSC)</option>
                </select>
            </form>
            </div>
        </form>
        `;
        document.getElementById('select-section-container').innerHTML = selectSectionHTML;

    }, 300);
}
