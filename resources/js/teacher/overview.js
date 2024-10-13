import { DataTable } from "simple-datatables";

export function overview() {
    // console.log("Overview initialized!");

    const totalSectionElement   = document.getElementById('total-section');
    const totalSubjectElement   = document.getElementById('total-subject');
    const totalStudentElement   = document.getElementById('total-student');
    const ongoingClassSchedule  = document.getElementById('ongoing-class-schedules');

    if (totalSectionElement) {
        axios.get(`/teacher/total-sections`)
        .then(response => {
            const totalSections = response.data;
            totalSectionElement.textContent = totalSections.total_sections ?? '0';
        })
        .catch(error => {
            console.error('Error fetching sections:', error);
        });
    }

    if (totalSubjectElement) {
        axios.get(`/teacher/total-subjects`)
        .then(response => {
            const totalSubjects = response.data;
            totalSubjectElement.textContent = totalSubjects.total_subjects ?? '0';
        })
        .catch(error => {
            console.error('Error fetching subjects:', error);
        });
    }

    if (totalStudentElement) {
        axios.get(`/teacher/total-students`)
        .then(response => {
            const totalStudents = response.data;
            totalStudentElement.textContent = totalStudents.total_students ?? '0';
        })
        .catch(error => {
            console.error('Error fetching students:', error);
        });
    }

    if (ongoingClassSchedule) {
        getOngoingClassSchedule()
    }
}

function getOngoingClassSchedule()
{
    const tableLoader = document.getElementById('table-loader');

    if (tableLoader) {
        tableLoader.style.display = 'flex';

        /* Axios GET request to populate the datatable */

        axios.get(`/teacher/ongoing-class-schedule`)
        .then(response => {
        const ongoingClassSchedules = response.data.class_schedules;

        /* Datatable */

        if (ongoingClassSchedules.length > 0) {
            const tableHTML = `
            <h5 class="text-xl font-medium text-gray-500 dark:text-gray-400 mb-3">Scheduled Classes for Today</h5>
                <table id="ongoingClassSchedule" class="bg-gray-50 dark:bg-gray-800">
                    <thead>
                        <tr>
                            <th>
                                <span class="flex items-center">
                                    Grade/Yr. & Section
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
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
                                    Day
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                            <th>
                                <span class="flex items-center">
                                    Scheduled Time
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                    </svg>
                                </span>
                            </th>
                        </tr>
                    </thead>
                <tbody></tbody>
            </table>`;

            document.getElementById('ongoing-class-schedules').innerHTML = tableHTML;
            const tbody     = document.querySelector('#ongoingClassSchedule tbody');
            tbody.innerHTML = '';

            function convertToAmPm(time) {
                const [hours, minutes] = time.split(':');
                const suffix = hours >= 12 ? 'PM' : 'AM';
                const adjustedHours = hours % 12 || 12; // Adjust hours to 12-hour format
                return `${adjustedHours}:${minutes} ${suffix}`;
            }

            ongoingClassSchedules.forEach(ongoingClassSchedule => {
                const section   = ongoingClassSchedule.section;
                const startTime = convertToAmPm(ongoingClassSchedule.start_time);
                const endTime   = convertToAmPm(ongoingClassSchedule.end_time);
            
                // Combine day names from the array
                const days = ongoingClassSchedule.days_of_week
                    .map(day => day.day_name)
                    .join(', '); // Concatenate with commas or other separator
            
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${section.grade_or_year_level}-${section.section_name}</td>
                    <td>${ongoingClassSchedule.subject} (${ongoingClassSchedule.subject_code})</td>
                    <td>${days}</td>
                    <td>${startTime}-${endTime}</td>
                `;
                tbody.appendChild(row);
            });

            new DataTable('#ongoingClassSchedule', {
                searchable: true,
                fixedHeight: true,
                sortable: true,
                perPage: 5,
            });

            document.getElementById('table-loader').style.display = 'none';

         } else {
                const tableHTML = `
                 <h5 class="text-xl font-medium text-gray-500 dark:text-gray-400 mb-3">Scheduled Classes for Today</h5>
                    <table id="ongoingClassSchedule" class="bg-gray-50 dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th>
                                    <span class="flex items-center">
                                        Grade/Yr. & Section
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
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
                                        Day
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                                <th>
                                    <span class="flex items-center">
                                        Scheduled Time
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                        </svg>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                </table>`;

                document.getElementById('ongoing-class-schedules').innerHTML = tableHTML;
                const tbody = document.querySelector('#ongoingClassSchedule tbody');
                tbody.innerHTML = '';

                new DataTable('#ongoingClassSchedule', {
                    searchable: true,
                    fixedHeight: true,
                    sortable: true,
                    perPage: 5,
                });

                document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
            }
        })
            
        .catch(error => {
            console.error('Error fetching class schedule:', error);
            document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
        });
    }
}


