<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/overview', function () {
    return view('layouts.teacher-layout.contents.overview');
})->middleware(['auth', 'verified'])->name('overview');

Route::get('/attendance-rfid', function () {
    return view('layouts.teacher-layout.contents.attendance-rfid');
})->middleware(['auth', 'verified'])->name('attendance_rfid');

Route::get('/student-management/section/index', function () {
    return view('layouts.teacher-layout.contents.student-management.section.index-section');
})->middleware(['auth', 'verified'])->name('student_management_section.index');

Route::get('/student-management/section/student/index', function () {
    return view('layouts.teacher-layout.contents.student-management.student.index-student-table');
})->middleware(['auth', 'verified'])->name('student_management_student.index');

Route::get('/class-schedule/index', function () {
    return view('layouts.teacher-layout.contents.class-schedule.index-class-schedule');
})->middleware(['auth', 'verified'])->name('class_schedule.index');

Route::get('/report', function () {
    return view('layouts.teacher-layout.contents.report');
})->middleware(['auth', 'verified'])->name('report');

Route::get('/geofence', function () {
    return view('layouts.teacher-layout.contents.geofence');
})->middleware(['auth', 'verified'])->name('geofence');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
