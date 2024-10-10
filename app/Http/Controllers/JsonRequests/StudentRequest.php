<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Section;

class StudentRequest extends Controller
{
    public function getStudents(Section $section)
    {
        $students = $section->student()->get();
        return response()->json($students);
    }
}
