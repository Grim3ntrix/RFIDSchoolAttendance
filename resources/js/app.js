import './bootstrap';
import 'flowbite';
import { renderPieCharts } from './teacher/pie-chart-design';
import Alpine from 'alpinejs';
import { initializeTeacherDatatable } from './superadmin/teacher-datatable';
import { initializeStudentDatatable } from './teacher/student-page-datatable';
import { initializeAttendanceDatatable } from './teacher/attendance-page-datatable';
import { initializeClassScheduleDatatable } from './teacher/class-schedule-page-datatable';

window.Alpine = Alpine;

Alpine.start();

/* Teacher - Pie Charts */

renderPieCharts();

/* Teacher - Student Page Datatables */

initializeStudentDatatable();

/* Teacher - Attendance Page Datatables */

initializeAttendanceDatatable();

/* Teacher - Class Schedule Page Datatables */

initializeClassScheduleDatatable();

/* SuperAdmin - Teacher Datatable */

initializeTeacherDatatable();
