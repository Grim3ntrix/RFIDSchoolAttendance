<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\ClassSchedule;
use App\Models\Section;
use Illuminate\Http\Request;

class ClassScheduleRequest extends Controller
{
    public function getClassSchedules(Section $section)
    {
        $classSchedules = $section->classSchedule()->with('daysOfWeek')->get();
        return response()->json($classSchedules);
    }

    public function getClassScheduleBySection($id)
    {
        $classSchedules = ClassSchedule::with('daysOfWeek')
        ->where('section_id', $id)
        ->get();
        return response()->json($classSchedules);
    }
}
