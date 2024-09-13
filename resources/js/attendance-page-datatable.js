import { DataTable } from "simple-datatables";

export function initializeAttendanceDatatable() {
  const customData = {
    "data": [
      [
        "2010456-1",
        "0009764193",
        "John Doe",
        "Melon",
        "Grade 7",
        "Male",
        "Late",
        `<button class="text-blue-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
            </svg>
        </button> 
        <button class="text-red-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg>
        </button>`,
      ],
      [
        "2010456-2",
        "0000635447",
        "Jane Doe",
        "Berry",
        "Grade 8",
        "Female",
        "Present",
        `<button class="text-blue-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
            </svg>
        </button> 
        <button class="text-red-500 hover:underline">
            <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
            </svg>
        </button>`,
      ],
    ]
  };

  // Initialize table with a loading spinner
  document.getElementById('table-loader').style.display = 'flex'; // Show the spinner

  setTimeout(() => {
        const tableHTML = `
        <table id="attendanceTable" class="bg-gray-50 dark:bg-gray-800">
            <thead>
                <tr>
                <th>School ID</th>
                <th>RFID</th>
                <th>Student Name</th>
                <th>Section</th>
                <th>Grade or Year Level</th>
                <th>Sex</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`;

        document.getElementById('attendance-datatable-container').innerHTML = tableHTML;

        const dataTable = new DataTable("#attendanceTable", {
        searchable: true,
        fixedHeight: true,
        sortable: true,
        perPage: 5,
        data: customData,
        });

        document.getElementById('table-loader').style.display = 'none';

  }, 300);
}
