<?php

use App\Http\Controllers\JsonRequests\ClassScheduleRequest;
use App\Http\Controllers\JsonRequests\DaysOfWeekRequest;
use App\Http\Controllers\JsonRequests\GeofenceBoundaryRequest;
use App\Http\Controllers\JsonRequests\GeofenceBoundaryStatusRequest;
use App\Http\Controllers\JsonRequests\StudentRequest;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SuperAdmin\PreRegisteredTeacherController;
use App\Http\Controllers\SuperAdmin\GeofenceBoundaryController;
use App\Http\Controllers\Teacher\ClassScheduleController;
use App\Http\Controllers\Teacher\SectionController;
use App\Http\Controllers\Teacher\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
})->middleware('redirect_if_authenticated');

/* Super Admin Routes */

Route::group(['middleware' => ['auth', 'verified', 'role:superadmin'], 'prefix' => 'superadmin'], function (){
    Route::get('overview', function () {
        return view('layouts.superadmin-layouts.contents.overview');
    })->name('superadmin_overview');

    Route::get('pre-registered-teachers/records', [PreRegisteredTeacherController::class, 'getTeacherRecords'])->name('teachers.records');
    Route::resource('pre-registered-teachers', PreRegisteredTeacherController::class)->except([
        'create', 'show',
    ]);

    Route::get('geofence-boundaries/statuses', [GeofenceBoundaryStatusRequest::class, 'getGeofenceBoundaryStatuses'])->name('geofence_boundary.statuses');
    Route::get('geofence-boundaries/records', [GeofenceBoundaryRequest::class, 'getGeofenceBoundary'])->name('geofence_boundary.records');
    Route::resource('geofence-boundaries', GeofenceBoundaryController::class)->except([
        'create', 'show',
    ]);
});

/* Teacher Routes */

Route::group(['middleware' => ['auth', 'verified', 'role:teacher'], 'prefix' => 'teacher'], function (){
    Route::get('overview', function () {
        return view('layouts.teacher-layouts.contents.overview');
    })->name('teacher_overview');
    
    Route::get('attendance-rfid', function () {
        return view('layouts.teacher-layouts.contents.attendance-rfid');
    })->name('attendance_rfid');
    
    Route::get('sections/records', [SectionController::class, 'getSectionRecords'])->name('sections.records');
    Route::resource('sections', SectionController::class)->except([
        'create', 'show',
    ]);

    Route::group(['prefix' => 'sections/{section:slug}'], function () {

        /* Student Routes */

        Route::get('students/list', [StudentRequest::class, 'getStudents'])->name('sections.students.list');
        
        Route::get('students', [StudentController::class, 'index'])->name('sections.students.index');
        Route::post('students', [StudentController::class, 'store'])->name('sections.students.store');
        Route::get('students/{student}/edit', [StudentController::class, 'edit'])->name('sections.students.edit');
        Route::put('students/{student}', [StudentController::class, 'update'])->name('sections.students.update');
        Route::delete('students/{student}', [StudentController::class, 'destroy'])->name('sections.students.destroy');

        /* Class Schedule Routes */
        
        Route::get('class-schedules/list', [ClassScheduleRequest::class, 'getClassSchedules'])->name('sections.class-schedules.list');
        Route::get('days-of-weeks/list', [DaysOfWeekRequest::class, 'getDaysOfWeeks'])->name('sections.days-of-weeks.list');

        Route::get('class-schedules', [ClassScheduleController::class, 'index'])->name('sections.class-schedules.index');
        Route::post('class-schedules', [ClassScheduleController::class, 'store'])->name('sections.class-schedules.store');
        Route::get('class-schedules/create', [ClassScheduleController::class, 'create'])->name('sections.class-schedules.create');
        Route::get('/', [ClassScheduleController::class, 'show'])->name('sections.class-schedules.show');
        Route::get('class-schedules/{class_schedule}/edit', [ClassScheduleController::class, 'edit'])->name('sections.class-schedules.edit');
        Route::put('class-schedules/{class_schedule}', [ClassScheduleController::class, 'update'])->name('sections.class-schedules.update');
        Route::delete('class-schedules/{class_schedule}', [ClassScheduleController::class, 'destroy'])->name('sections.class-schedules.destroy');
    });
    
    Route::get('report', function () {
        return view('layouts.teacher-layouts.contents.report');
    })->name('report');
    
    Route::get('geofence', function () {
        return view('layouts.teacher-layouts.contents.geofence');
    })->name('geofence');
});

/* Student Routes */

Route::group(['middleware' => ['auth', 'verified', 'role:student'], 'prefix' => 'student'], function (){
    Route::get('overview', function () {
        return view('layouts.student-layouts.contents.overview');
    })->name('student_overview');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
