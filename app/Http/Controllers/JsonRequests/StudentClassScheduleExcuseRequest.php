<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Attendance;

class StudentClassScheduleExcuseRequest extends Controller
{
    public function getExcuseRequestClassScheduleAttendance($classSchdeuleId)
    {
        $attendances = Attendance::where('class_schedule_id', $classSchdeuleId)
        ->with('attendanceStatus')
        ->whereHas('attendanceStatus', function($query) {
            $query->where('status', 'absent');
        })
        ->orderBy('status_id', 'asc')
        ->get();
        
        return response()->json($attendances);
    }
}
