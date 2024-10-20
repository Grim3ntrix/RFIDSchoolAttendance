<?php

use App\Http\Controllers\JsonRequests\{
    AttendanceRequest,
    ClassScheduleRequest,
    DaysOfWeekRequest,
    ExcuseMessageRequest,
    StudentExcuseRequest,
    GeofenceBoundaryMapRequest,
    GeofenceBoundaryRequest,
    GeofenceBoundaryStatusRequest,
    QuarterRequest,
    ReviewStudentExcuseRequest,
    SectionRequest,
    StudentBySectionRequest,
    StudentClassScheduleExcuseRequest,
    StudentLocationByTeacherRequest,
    StudentLocationRequest,
    StudentOverviewRequest,
    StudentPendingExcuseRequestCount,
    StudentRequest,
    SuperAdminOverviewRequest,
    TeacherOverviewRequest,
    TeacherPendingExcuseRequestCount
};
use App\Http\Controllers\{
    ProfileController
};
use App\Http\Controllers\Student\{
    ExcuseController as StudentExcuseController,
    WatchPositionController
};
use App\Http\Controllers\SuperAdmin\{
    PreRegisteredTeacherController,
    GeofenceBoundaryController
};
use App\Http\Controllers\Teacher\{
    ApproveStudentExcuseRequestController,
    AttendanceReportController,
    ClassScheduleController,
    DeclineStudentExcuseRequestController,
    ExcuseController as TeacherExcuseController,
    ReportController,
    RFIDAttendanceController,
    SectionController,
    StudentController,
    StudentLocationController
};
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
})->middleware('redirect_if_authenticated');

/* Super Admin Routes */

Route::group(['middleware' => ['auth', 'verified', 'role:superadmin'], 'prefix' => 'superadmin'], function (){

    Route::get('overview', function () {
        return view('layouts.superadmin-layouts.contents.overview');
    })->name('superadmin_overview');

    Route::get('total-pre-registered', [SuperAdminOverviewRequest::class, 'getTotalPreRegistered'])->name('total.pre_registered');
    Route::get('total-registered', [SuperAdminOverviewRequest::class, 'getTotalRegistered'])->name('total.registered');
    Route::get('total-teachers', [SuperAdminOverviewRequest::class, 'getTotalTeachers'])->name('total.teachers');

    Route::get('pre-registered-teachers/records', [PreRegisteredTeacherController::class, 'getTeacherRecords'])->name('teachers.records');
    Route::resource('pre-registered-teachers', PreRegisteredTeacherController::class)->except([
        'create', 'show',
    ]);

    Route::get('geofence-boundaries/map', [GeofenceBoundaryMapRequest::class, 'getGeofenceBoundaryMap'])->name('super_admin_geofence_boundary.map');
    Route::get('geofence-boundaries/statuses', [GeofenceBoundaryStatusRequest::class, 'getGeofenceBoundaryStatuses'])->name('geofence_boundary.statuses');
    Route::get('geofence-boundaries/records', [GeofenceBoundaryRequest::class, 'getGeofenceBoundary'])->name('geofence_boundary.records');
    Route::resource('geofence-boundaries', GeofenceBoundaryController::class)->except([
        'create', 'show',
    ]);
});

/* Teacher Routes */

Route::group(['middleware' => ['auth', 'verified', 'role:teacher'], 'prefix' => 'teacher'], function (){
    
    /* Overview Routes */

    Route::get('total-sections', [TeacherOverviewRequest::class, 'getTotalSections'])->name('total.sections');
    Route::get('total-subjects', [TeacherOverviewRequest::class, 'getTotalSubjects'])->name('total.subjects');
    Route::get('total-students', [TeacherOverviewRequest::class, 'getTotalStudents'])->name('total.students');
    Route::get('ongoing-class-schedule', [TeacherOverviewRequest::class, 'getOnGoingClassSchedule'])->name('ongoing_class_schedule');

    Route::get('overview', function () {
        return view('layouts.teacher-layouts.contents.overview');
    })->name('teacher_overview');

    Route::get('get-section/{sectionId}', [AttendanceRequest::class, 'getDailyAttendanceForPieChart'])->name('section.get');
    
    /* RFID Atendance Routes */

    Route::get('sections-record', [SectionRequest::class, 'getSections'])->name('sections.record');
    Route::get('class-schedules/{selectedSectionId}', [ClassScheduleRequest::class, 'getClassScheduleBySection'])->name('class_schedules.bysection');
    Route::get('students/daily-attendances', [AttendanceRequest::class, 'getDailyAttendanceByTeacher'])->name('student_daily_attendances.bysection');
    Route::get('students/daily-attendances/counts', [AttendanceRequest::class, 'getAttendanceCountByTeacher'])->name('student_daily_attendances.count');

    Route::resource('rfid-attendances', RFIDAttendanceController::class)->only([
        'index', 'store',
    ]);

    Route::get('sections/records', [SectionController::class, 'getSectionRecords'])->name('sections.records');
    Route::resource('sections', SectionController::class)->except([
        'create', 'show',
    ]);

    Route::group(['middleware' => ['ensure_teacher_section_ownership'], 'prefix' => 'sections/{section:slug}'], function () {

        /* Section - Student Routes */

        Route::get('students/list', [StudentRequest::class, 'getStudents'])->name('sections.students.list');
        
        Route::resource('students', StudentController::class)->except(['show']);

        /* Class Schedule Routes */
        
        Route::get('class-schedules-list', [ClassScheduleRequest::class, 'getClassSchedules'])->name('sections.class-schedules.list');
        Route::get('days-of-weeks-list', [DaysOfWeekRequest::class, 'getDaysOfWeeks'])->name('sections.days-of-weeks.list');

        Route::resource('class-schedules', ClassScheduleController::class);
    });

    /* Reports Routes */
    
    Route::get('students/{section}', [StudentBySectionRequest::class, 'getStudentBySection'])->name('students.bysection');
    Route::get('quarters', [QuarterRequest::class, 'getQuarters'])->name('quarters.get');
    Route::get('/attendance-quarterly-report', [AttendanceReportController::class, 'generateReport']);

    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::post('reports-to-generate', [AttendanceReportController::class, 'reportsToGenerate'])->name('reports_to_generate');
    // Route::get('reports-to-download', [AttendanceReportController::class, 'reportsToDownload'])->name('reports_to_download');

    /* Student Location Routes */
    
    Route::get('student/{student}/location', [StudentLocationRequest::class, 'getStudentLocation'])->name('student.location');
    Route::get('geofence-boundaries/map', [GeofenceBoundaryMapRequest::class, 'getGeofenceBoundaryMap'])->name('teacher_geofence_boundary.map');
    Route::get('student-locations/request', [StudentLocationByTeacherRequest::class, 'getStudentLocationsByTeacher'])->name('student_locations.request');
    Route::get('student-locations', [StudentLocationController::class, 'index'])->name('student_locations.index');

    /* Teacher Excuse to Review*/

    Route::get('/get-excuse-request-by-student-to-review', [ReviewStudentExcuseRequest::class, 'getStudentExcuseRequestToReview'])->name('get_excuse_request_by_student_to_review.get');
    Route::get('/get-excuse-request-message/{id}', [ExcuseMessageRequest::class, 'getExcuseMessageRequest'])->name('get_teacher_excuse_message_request.get');
    Route::get('/get-excuse-request-class-schedule-attendance/{classSchdeuleId}', [StudentClassScheduleExcuseRequest::class, 'getExcuseRequestClassScheduleAttendance'])->name('get_teacher_excuse_request_class_scheule_attendance.get');
    Route::post('/mark-excuse-student-attendances/{attendanceId}', [ApproveStudentExcuseRequestController::class, 'attendanceMarkExcuse'])->name('stuudent_mark_excuse.update');
    Route::get('/count-pending-excuse-request', [TeacherPendingExcuseRequestCount::class, 'countPendingExcuseRequests'])->name('teacher_count_pending_excuse_requests.get');
    Route::post('/decline-excuse-request/{classScheduleId}', [DeclineStudentExcuseRequestController::class, 'declineStudentExcuseRequest'])->name('decline_student_excuse_request.update');

    Route::resource('excuses', TeacherExcuseController::class)->names([
        'index'     => 'teacher.excuses.index',
    ])->only([
        'index'
    ]);
});

/* Student Routes */

Route::group(['middleware' => ['auth', 'verified', 'role:student'], 'prefix' => 'student'], function (){

    Route::post('student-locations', [WatchPositionController::class, 'store'])->name('student_locations.store');

    Route::get('overview', function () {
        return view('layouts.student-layouts.contents.overview');
    })->name('student_overview');

    Route::get('class-schedule-select-for-overview', [StudentOverviewRequest::class, 'getStudentClassSchedules'])->name('student_class_schedules.get');
    Route::get('get-attendance-status-totals-by-student-overview', [StudentOverviewRequest::class, 'getAttendanceStatusTotals'])->name('attendance_status_totals.get');

    /* Student Excuse */

    Route::get('/get-class-schedule-by-student', [StudentExcuseRequest::class, 'getClassScheduleByStudent'])->name('class_schedule_by_student.get');
    Route::get('/get-excuse-request-by-student', [StudentExcuseRequest::class, 'getExcuseRequestByStudent'])->name('get_excuse_request_by_student.get');
    Route::get('/get-excuse-request-message/{id}', [ExcuseMessageRequest::class, 'getExcuseMessageRequest'])->name('get_student_excuse_message_requestt.get');
    Route::get('/count-pending-excuse-request', [StudentPendingExcuseRequestCount::class, 'countPendingExcuseRequests'])->name('student_count_pending_excuse_requests.get');

    Route::resource('excuses', StudentExcuseController::class)->names([
        'index'     => 'student.excuses.index',
        'store'     => 'student.excuses.store',
        'destroy'   => 'student.excuses.destroy'
    ])->only([
        'index', 'store', 'destroy'
    ]);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
