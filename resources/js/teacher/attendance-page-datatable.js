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
        ],
        [
            "2010456-2",
            "0000635447",
            "Jane Doe",
            "Berry",
            "Grade 8",
            "Female",
            "Present",
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
                    <th>
                        <span class="flex items-center">
                            School ID
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                            </svg>
                        </span>
                    </th>
                    <th>
                        <span class="flex items-center">
                            RFID
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                            </svg>
                        </span>
                    </th>
                    <th>
                        <span class="flex items-center">
                            Student Name
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                            </svg>
                        </span>
                    </th>
                    <th>
                        <span class="flex items-center">
                            Section
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                            </svg>
                        </span>
                    </th>
                    <th>
                        <span class="flex items-center">
                            Grade or/ Year Level
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
                            Status
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                            </svg>
                        </span>
                    </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>`;

            document.getElementById('attendance-table-container').innerHTML = tableHTML;

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
