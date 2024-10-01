<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendanceRequest extends Controller
{
    public function getDailyAttendanceByTeacher()
    {
        $user    = Auth::user();
        $teacher = $user->teacher;

        $dailyAttendances = Attendance::with('attendanceStatus' ,'student', 'classSchedule.section')
                  ->whereHas('classSchedule', function ($query) use ($teacher) {
            $query->where('teacher_id', $teacher->id)
                  ->whereDate('created_at', now());
        })->get();
       

        return response()->json($dailyAttendances);
    }

    public function getAttendanceCountByTeacher()
    {
        $user    = Auth::user();
        $teacher = $user->teacher;

        $dailyAttendanceCount = Attendance::whereHas('classSchedule', function ($query) use ($teacher) {
            $query->where('teacher_id', $teacher->id)
                  ->whereDate('created_at', now());
        })->count();

        return response()->json($dailyAttendanceCount);
    }
}
