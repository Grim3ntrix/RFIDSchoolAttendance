import './bootstrap';
import 'flowbite';
import Alpine from 'alpinejs';
import { initializeThemeToggle } from './theme-toggle';

window.Alpine = Alpine;
Alpine.start();

initializeThemeToggle();

document.addEventListener('DOMContentLoaded', async () => {

    try {

        /* SuperAdmin - Overview */
        if (document.querySelector('#total-pre-registered')) {
            const { overview } = await import('./superadmin/overview');
            overview();
        }

        /* SuperAdmin - School Geofence Boundary Datatable */
        if (document.querySelector('#geofence-boundaries-datatable-container')) {
            const { initializeGeofenceDatatable } = await import('./superadmin/geofence-boundary-datatable');
            initializeGeofenceDatatable();
        }

        /* SuperAdmin - Teacher Datatable */
        if (document.querySelector('#teacher-datatable-container')) {
            const { initializeTeacherDatatable } = await import('./superadmin/teacher-datatable');
            initializeTeacherDatatable();
        }

        /* Teacher - Pie Charts - section options */
        if (document.querySelector('#section-piechart')) {
            const { initializeSectionOption } = await import('./teacher/pie-chart-design');
            initializeSectionOption();
        }
            
        /* Teacher - Pie Charts */
        if (document.querySelector('#pie-chart-container')) {
            const { renderPieCharts } = await import('./teacher/pie-chart-design');
            renderPieCharts();
        }

        /* Teacher - Total Section */
        if (document.querySelector('#total-section')) {
            const { overview } = await import('./teacher/overview');
            overview();
        }

        /* Teacher - Student Page Datatables */
        if (document.querySelector('#student-datatable-container')) {
            const { initializeStudentDatatable } = await import('./teacher/student-page-datatable');
            initializeStudentDatatable();
        }

        /* Teacher - Attendance Page Datatables */
        if (document.querySelector('#daily-attendance-table-container')) {
            const { rfidAttendance } = await import('./teacher/rfid-attendance');
            rfidAttendance();
        }

        /* Teacher - Review Previous Attendance Page Datatables */
        if (document.querySelector('#review-previous-attendances-table-container')) {
            const { reviewPreviousAttendance } = await import('./teacher/review-previous-attendance');
            reviewPreviousAttendance();
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

        /* Teacher - Reports */
        if (document.querySelector('#reports-container')) {
            const { reports } = await import('./teacher/report');
            reports();
        }

        /* Teacher - Student Excuse Request to Review */
        if (document.querySelector('#student-excuse-request-to-review-container')) {
            const { studentClassScheduleToReview } = await import('./teacher/excuse-request-to-review');
            studentClassScheduleToReview();
        }

        /* Teacher - Pending Excuse Request Count */
        if (document.querySelector('#teacher-excuse-request-pending-count')) {
            const { pendingExcuseRequestCount } = await import('./teacher/pending-excuse-request-count');
            pendingExcuseRequestCount();
        }

        /* Student - Class Schedule Select Option */
        if (document.querySelector('#class-schedule-student-overview')) {
            const { initializeClassOption } = await import('./student/overview');
            initializeClassOption();
        }

        /* Student - Overview */
        if (document.querySelector('#total-present')) {
            const { overview } = await import('./student/overview');
            overview();
        }

        /* Student - Student Watch Position */
        if (document.querySelector('#student-watch-position')) {
            const { studentWatchPosition } = await import('./student/student-watch-position');
            studentWatchPosition();
        }

        /* Student - Excuse Request */
        if (document.querySelector('#student-excuse-request-container')) {
            const { studentExcuse } = await import('./student/excuse');
            studentExcuse();
        }

        /* Student - Pending Excuse Request Count */
        if (document.querySelector('#student-excuse-request-pending-count')) {
            const { StudentPendingExcuseRequestCount } = await import('./student/pending-excuse-request-count');
            StudentPendingExcuseRequestCount();
        }

    } catch (error) {
        console.error('Error during module imports:', error);
    }

});
