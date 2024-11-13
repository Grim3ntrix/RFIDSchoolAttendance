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
            <div class="flex flex-row mb-1">
                <div>
                    <svg class="w-7 h-7 mr-2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#E6EAEA;" d="M384.267,58.512H8.017C3.588,58.512,0,62.101,0,66.529V374.37c0,4.428,3.588,8.017,8.017,8.017 h376.251c4.428,0,8.017-3.588,8.017-8.017V66.529C392.284,62.102,388.696,58.512,384.267,58.512z"></path> <path style="fill:#CDD4D5;" d="M8.017,58.512C3.588,58.512,0,62.101,0,66.529V374.37c0,4.428,3.588,8.017,8.017,8.017h188.125 V58.512C196.142,58.512,8.017,58.512,8.017,58.512z"></path> <rect x="59.324" y="169.142" style="fill:#687F82;" width="68.409" height="68.409"></rect> <rect x="264.551" y="169.142" style="fill:#9BAAAB;" width="68.409" height="68.409"></rect> <rect x="59.324" y="271.755" style="fill:#687F82;" width="68.409" height="68.409"></rect> <g> <rect x="161.937" y="271.755" style="fill:#9BAAAB;" width="68.409" height="68.409"></rect> <rect x="161.937" y="169.142" style="fill:#9BAAAB;" width="68.409" height="68.409"></rect> <rect x="264.551" y="271.755" style="fill:#9BAAAB;" width="68.409" height="68.409"></rect> </g> <g> <rect x="161.937" y="169.142" style="fill:#687F82;" width="34.205" height="68.409"></rect> <rect x="161.937" y="271.755" style="fill:#687F82;" width="34.205" height="68.409"></rect> </g> <path style="fill:#4ACFD9;" d="M213.244,7.205H179.04c-4.428,0-8.017,3.588-8.017,8.017v102.614c0,4.428,3.588,8.017,8.017,8.017 h34.205c4.428,0,8.017-3.588,8.017-8.017V15.222C221.261,10.795,217.673,7.205,213.244,7.205z"></path> <path style="fill:#0295AA;" d="M179.04,7.205c-4.428,0-8.017,3.588-8.017,8.017v102.614c0,4.428,3.588,8.017,8.017,8.017h17.102 V7.205C196.142,7.205,179.04,7.205,179.04,7.205z"></path> <path style="fill:#4ACFD9;" d="M341.511,7.205h-34.205c-4.428,0-8.017,3.588-8.017,8.017v102.614c0,4.428,3.588,8.017,8.017,8.017 h34.205c4.428,0,8.017-3.588,8.017-8.017V15.222C349.528,10.795,345.94,7.205,341.511,7.205z"></path> <path style="fill:#0295AA;" d="M84.977,7.205H50.772c-4.428,0-8.017,3.588-8.017,8.017v102.614c0,4.428,3.588,8.017,8.017,8.017 h34.205c4.428,0,8.017-3.588,8.017-8.017V15.222C92.994,10.795,89.405,7.205,84.977,7.205z"></path> <path style="fill:#FF8C29;" d="M367.165,215.124c-79.862,0-144.835,64.973-144.835,144.835s64.973,144.835,144.835,144.835 S512,439.822,512,359.96S447.027,215.124,367.165,215.124z"></path> <g> <path style="fill:#FFFFFF;" d="M477.261,367.976c-4.428,0-8.017-3.588-8.017-8.017c0-11.734-1.983-23.243-5.895-34.208 c-1.488-4.17,0.687-8.755,4.858-10.244c4.167-1.487,8.756,0.686,10.244,4.858c4.529,12.697,6.826,26.019,6.826,39.594 C485.278,364.387,481.689,367.976,477.261,367.976z"></path> <path style="fill:#FFFFFF;" d="M457.729,305.425c-2.541,0-5.04-1.206-6.597-3.451c-13.54-19.54-33.509-33.84-56.227-40.264 c-4.26-1.205-6.737-5.634-5.533-9.896c1.205-4.261,5.633-6.739,9.896-5.533c26.289,7.433,49.388,23.969,65.043,46.561 c2.52,3.638,1.615,8.633-2.025,11.155C460.895,304.962,459.302,305.425,457.729,305.425z"></path> </g> <path style="fill:#E6EAEA;" d="M367.165,269.123c-50.087,0-90.837,40.748-90.837,90.836s40.749,90.837,90.837,90.837 s90.837-40.749,90.837-90.837S417.252,269.123,367.165,269.123z"></path> <path style="fill:#FD6A33;" d="M222.33,359.96c0,79.862,64.973,144.835,144.835,144.835v-289.67 C287.303,215.124,222.33,280.097,222.33,359.96z"></path> <path style="fill:#CDD4D5;" d="M276.328,359.96c0,50.087,40.749,90.837,90.837,90.837V269.123 C317.078,269.123,276.328,309.871,276.328,359.96z"></path> <path style="fill:#F0353D;" d="M414.196,373.836h-47.031c-4.428,0-8.017-3.588-8.017-8.017v-47.031c0-4.428,3.588-8.017,8.017-8.017 c4.428,0,8.017,3.588,8.017,8.017v39.015h39.015c4.428,0,8.017,3.588,8.017,8.017C422.213,370.248,418.625,373.836,414.196,373.836z "></path> </g></svg>
                </div>
                <div>
                    <h5 class="text-xl font-medium text-gray-500 dark:text-gray-400 mb-3">Scheduled Classes for Today</h5>
                </div>
            </div>

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


