import './bootstrap';
import 'flowbite';
import { renderPieCharts } from './pie-chart-design';
import Alpine from 'alpinejs';
import { initializeStudentDatatable } from './student-page-datatable';
import { initializeAttendanceDatatable } from './attendance-page-datatable';
import { initializeClassScheduleDatatable } from './class-schedule-page-datatable';

window.Alpine = Alpine;

Alpine.start();

/* Pie Charts */

renderPieCharts();

/* Student Page Datatables */

initializeStudentDatatable();

/* Attendance Page Datatables */

initializeAttendanceDatatable();

/* Class Schedule Page Datatables */

initializeClassScheduleDatatable();