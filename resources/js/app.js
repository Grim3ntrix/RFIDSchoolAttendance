import './bootstrap';
import 'flowbite';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

document.addEventListener('DOMContentLoaded', async () => {

    /* SuperAdmin - School Geofence Boundary Datatable */
    if (document.querySelector('#geofence-boundaries-datatable-container')) {
        const { initializeGeofenceDatatable } = await import('./superadmin/geofence-boundary-datatable');
        initializeGeofenceDatatable();
    }
    
    /* Teacher - Pie Charts */
    if (document.querySelector('#pie-chart-container')) {
        const { renderPieCharts } = await import('./teacher/pie-chart-design');
        renderPieCharts();
    }

    /* SuperAdmin - Teacher Datatable */
    if (document.querySelector('#teacher-datatable-container')) {
        const { initializeTeacherDatatable } = await import('./superadmin/teacher-datatable');
        initializeTeacherDatatable();
    }

    /* Teacher - Student Page Datatables */
    if (document.querySelector('#student-datatable-container')) {
        const { initializeStudentDatatable } = await import('./teacher/student-page-datatable');
        initializeStudentDatatable();
    }

    /* Teacher - Attendance Page Datatables */
    if (document.querySelector('#attendance-table-container')) {
        const { initializeAttendanceDatatable } = await import('./teacher/attendance-page-datatable');
        initializeAttendanceDatatable();
    }

    /* Teacher - Class Schedule Page Datatables */
    if (document.querySelector('#class-schedule-datatable-container')) {
        const { initializeClassScheduleDatatable } = await import('./teacher/class-schedule-page-datatable');
        initializeClassScheduleDatatable();
    }

    /* Teacher - Section */
    if (document.querySelector('#sections-container')) {
        const { initializeSectionPage } = await import('./teacher/add-section-page');
        initializeSectionPage();
    }

    /* Teacher - Student Location */
    if (document.querySelector('#student-locations-datatable-container')) {
        const { studentLocationPage } = await import('./teacher/student-location');
        studentLocationPage();
    }

    /* Student - Student Watch Position */
    if (document.querySelector('#student-watch-position')) {
        const { studentWatchPosition } = await import('./student/student-watch-position');
        studentWatchPosition();
    }

});
