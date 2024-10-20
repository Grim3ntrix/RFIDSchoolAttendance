<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Student;

class StudentLocationRequest extends Controller
{
    public function getStudentLocation(Student $student)
    {
        # Get student location and display in the map
        if (!$student || $student->studentLocation->isEmpty()) {
            return response()->json(['error' => 'Student location not found'], 404);
        }

        $studentLocation = $student->studentLocation()->latest()->first();

        return response()->json($studentLocation);
    }
}
