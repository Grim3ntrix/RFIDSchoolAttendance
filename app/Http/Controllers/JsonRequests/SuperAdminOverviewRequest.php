<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\PreRegisteredTeacher;
use App\Models\Teacher;
use Illuminate\Http\Request;

class SuperAdminOverviewRequest extends Controller
{
    public function getTotalPreRegistered()
    {
        $preRegisteredTeacher = PreRegisteredTeacher::all()->count();

        return response()->json(['preRegisteredTeacher' =>$preRegisteredTeacher]);
    }

    public function getTotalRegistered()
    {
        $preRegisteredTeacher = PreRegisteredTeacher::pluck('teacher_id');

        $registered = Teacher::whereIn('teacher_id', $preRegisteredTeacher)->count();

        return response()->json(['registered' =>$registered]);
    }

    public function getTotalTeachers()
    {
        $teachers = Teacher::all()->count();

        return response()->json(['teachers' => $teachers]);
    }
}
