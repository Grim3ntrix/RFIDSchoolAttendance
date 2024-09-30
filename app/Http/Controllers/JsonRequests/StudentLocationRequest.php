<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentLocationRequest extends Controller
{
    public function getStudentLocation(Student $student)
    {
        if (!$student || $student->studentLocation->isEmpty()) {
            return response()->json(['error' => 'Student location not found'], 404);
        }

        $studentLocation = $student->studentLocation()->latest()->first();

        return response()->json($studentLocation);
    }
}
