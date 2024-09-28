import './bootstrap';
import 'flowbite';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

document.addEventListener('DOMContentLoaded', async () => {
    
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

    /* SuperAdmin - School Geofence Boundary Datatable */
    if (document.querySelector('#geofence-boundary-datatable-container')) {
        const { initializeGeofenceDatatable } = await import('./superadmin/geofence-boundary-datatable');
        initializeGeofenceDatatable();
    }
});
