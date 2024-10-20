<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class StudentExcuseRequest extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function getClassScheduleByStudent()
    {
        $classSchedules = $this->user->student
            ? optional($this->user->student->section)->classSchedule()
                ->with('section', 'teacher', 'teacher.user')
                ->get() ?? [] 
            : [];

        return response()->json(['classSchedules' => $classSchedules]);
    }

    public function getExcuseRequestByStudent()
    {
        $excuseRequest = $this->user->student
            ? $this->user->student->excuseRequest()
                ->with('excuseRequestStatus', 'student', 'student.section', 'classSchedule', 'classSchedule.teacher', 'classSchedule.teacher.user', 'classSchedule.daysOfWeek')
                ->latest()
                ->get() ?? []
            : [];

        return response()->json([
            'excuseRequest' => $excuseRequest,
        ]);
    }
}
