import { DataTable } from "simple-datatables";

export function initializeTeacherDatatable() {

    const actionButtons = `
        <button type="button" data-modal-target="edit-teacher-modal" data-modal-toggle="edit-teacher-modal" class="text-blue-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
            </svg>
        </button> 
        <button type="button" data-modal-target="delete-teacher-modal" data-modal-toggle="delete-teacher-modal" class="text-red-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg>
        </button>
    `;

    const editTeacherModalEl = document.getElementById('edit-teacher-modal');
    
    if (editTeacherModalEl) {
        const editTeacherModal = new Modal(editTeacherModalEl);
    
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="edit-teacher-modal"]')) {
                e.preventDefault();
    
                editTeacherModal.show();
            }
        });
    }
    
    const deleteTeacherModalEl = document.getElementById('delete-teacher-modal');
    
    if (deleteTeacherModalEl) {
        const deleteTeacherModal = new Modal(deleteTeacherModalEl); // Initialize the modal because we're not loaded it in the DOM
    
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-teacher-modal"]')) {
                e.preventDefault();
    
                deleteTeacherModal.show();
            }
        });
    }

    const customData = {
        "data": [
            [
                "12345-2",
                "Teach Pasaway",
                "Female",
                "Januaey 4, 1968",
                "Brgy. Pasaway",
                "pasaway@gmail.com",
                "09658447845",
                `${actionButtons}`,
            ],
            [
                "12345-1",
                "Teach Bugwak",
                "Male",
                "Januaey 4, 1961",
                "Brgy. Bugwak",
                "bugwak@gmail.com",
                "09658447846",
                `${actionButtons}`,
            ],
        ]
    };    

    // Initialize table with a loading spinner
    document.getElementById('table-loader').style.display = 'flex';

    setTimeout(() => {
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

        const dataTable = new DataTable("#teacherTable", {
            searchable: true,
            fixedHeight: true,
            sortable: true,
            perPage: 5,
            data: customData,
        });
        
        document.getElementById('table-loader').style.display = 'none';

    }, 300);
}
