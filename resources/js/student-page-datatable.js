import { DataTable } from "simple-datatables";

export function initializeStudentDatatable() {

    const actionButtons = `
        <button type="button" data-modal-target="edit-student-modal" data-modal-toggle="edit-student-modal" class="text-blue-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
            </svg>
        </button> 
        <button type="button" data-modal-target="delete-student-modal" data-modal-toggle="delete-student-modal" class="text-red-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg>
        </button>
    `;

    const editStudentModalEl = document.getElementById('edit-student-modal');

    if (editStudentModalEl) {
        const editStudentModal = new Modal(editStudentModalEl);
    
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="edit-student-modal"]')) {
                e.preventDefault();
    
                editStudentModal.show();
            }
        });
    }
    
    const deleteStudentModalEl = document.getElementById('delete-student-modal');
    
    if (deleteStudentModalEl) {
        const deleteStudentModal = new Modal(deleteStudentModalEl); // Initialize the modal because we're not loaded it in the DOM
    
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-modal-toggle="delete-student-modal"]')) {
                e.preventDefault();
    
                deleteStudentModal.show();
            }
        });
    }

    const customData = {
        "data": [
        [
            "2010456-1",
            "0009764193",
            "John Doe",
            "Melon",
            "Grade 7",
            "Male",
            `${actionButtons}`,
        ],
        [
            "2010456-2",
            "0000635447",
            "Jane Doe",
            "Berry",
            "Grade 8",
            "Female",
            `${actionButtons}`,,
        ],
        ]
    };

    // Loading spinner show
    document.getElementById('table-loader').style.display = 'flex';

    setTimeout(() => {
        const tableHTML = `
        <table id="searchTable" class="bg-gray-50 dark:bg-gray-800">
            <thead>
            <tr>
                <th>
                <span class="flex items-center">
                    School ID
                    <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                    </svg>
                </span>
                </th>
                <th>
                    <span class="flex items-center">
                        RFID
                        <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                        </svg>
                    </span>
                </th>
                <th>
                    <span class="flex items-center">
                        Student Name
                        <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                        </svg>
                    </span>
                </th>
                <th>
                    <span class="flex items-center">
                        Section
                        <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                        </svg>
                    </span>
                </th>
                <th>
                    <span class="flex items-center">
                        Grade or/ Year Level
                        <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                        </svg>
                    </span>
                </th>
                <th>
                    <span class="flex items-center">
                        Sex
                        <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                        </svg>
                    </span>
                </th>
                <th>
                    <span class="flex items-center">
                        Action
                        <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                        </svg>
                    </span>
                </th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>`;

        document.getElementById('student-table-container').innerHTML = tableHTML;

        const dataTable = new DataTable("#searchTable", {
        searchable: true,
        fixedHeight: true,
        sortable: true,
        perPage: 5,
        data: customData,
        });

        // Loading spinner hidden
        document.getElementById('table-loader').style.display = 'none';

        const addStudentForm = `
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School ID</label>
                        <input type="text" id="student" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter School ID" required />
                    </div>
                    <div>
                        <label for="rfid_serial_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RFID Serial No.</label>
                        <input type="number" id="rfid_serial_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0000000000" required />
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student</label>
                        <input type="text" id="student" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Student" required />
                    </div>
                    <div>
                        <label for="section" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                        <select id="section" class="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Choose a Section</option>
                        <option value="melon">Melon</option>
                        <option value="guava">Guava</option>
                        <option value="berry">Berry</option>
                        <option value="special_science_class">Special Science Class (SSC)</option>
                        </select>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="grade_or_year_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                        <input type="text" id="grade_or_year_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Grade or/ Year Level" required />
                    </div>
                    <div>
                    <label for="sex" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sex</label>
                        <select id="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Choose a Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        `;
        document.getElementById('add-student-form').innerHTML = addStudentForm;

        const editStudentForm = `
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School ID</label>
                        <input type="text" id="student" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter School ID" required />
                    </div>
                    <div>
                        <label for="rfid_serial_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RFID Serial No.</label>
                        <input type="number" id="rfid_serial_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0000000000" required />
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student</label>
                        <input type="text" id="student" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Student" required />
                    </div>
                    <div>
                        <label for="section" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                        <select id="section" class="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Choose a Section</option>
                        <option value="melon">Melon</option>
                        <option value="guava">Guava</option>
                        <option value="berry">Berry</option>
                        <option value="special_science_class">Special Science Class (SSC)</option>
                        </select>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="grade_or_year_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                        <input type="text" id="grade_or_year_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Grade or/ Year Level" required />
                    </div>
                    <div>
                    <label for="sex" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sex</label>
                        <select id="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Choose a Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        `;
        document.getElementById('edit-student-form').innerHTML = editStudentForm;

    }, 300);
}
