import { DataTable } from "simple-datatables";
import { refreshIcons } from "../icons";

/* Shared table markup for both branches (with / without schedules).
   No overflow-x-auto wrapper: simple-datatables hoists its own widget
   (search bar, .datatable-container, pager) in place of the table, so an
   overflow div here would scroll the whole widget and stack a second
   scrollbar under Flowbite's .datatable-container one, which already
   scrolls the table. */
const ongoingScheduleTable = `
        <table id="ongoingClassSchedule" class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-4 py-3">Grade/Yr. &amp; Section</th>
                    <th scope="col" class="px-4 py-3">Subject</th>
                    <th scope="col" class="px-4 py-3">Day</th>
                    <th scope="col" class="px-4 py-3">Scheduled Time</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`;

const ongoingScheduleEmptyState = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <i data-lucide="calendar-days" class="h-6 w-6"></i>
        </span>
        <h4 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No classes scheduled for today</h4>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Your scheduled classes will appear here once the school day begins.</p>
    </div>`;

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
            document.getElementById('ongoing-class-schedules').innerHTML = ongoingScheduleTable;
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
                row.className = 'border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50';
                row.innerHTML = `
                    <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${section.grade_or_year_level}-${section.section_name}</td>
                    <td class="px-4 py-3">${ongoingClassSchedule.subject} (${ongoingClassSchedule.subject_code})</td>
                    <td class="px-4 py-3">${days}</td>
                    <td class="px-4 py-3 whitespace-nowrap">${startTime}-${endTime}</td>
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
                document.getElementById('ongoing-class-schedules').innerHTML = ongoingScheduleEmptyState;
                refreshIcons();

                document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
            }
        })

        .catch(error => {
            console.error('Error fetching class schedule:', error);
            document.getElementById('table-loader').style.display = 'none'; // Hide Loading spinner
        });
    }
}
