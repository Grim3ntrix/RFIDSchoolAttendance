<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Student;

class StudentBySectionRequest extends Controller
{
    public function getStudentBySection($id)
    {
        $students = Student::where('section_id', $id)
                            ->orderBy('first_name', 'asc')
                            ->get();
        return response()->json($students);
    }
}
