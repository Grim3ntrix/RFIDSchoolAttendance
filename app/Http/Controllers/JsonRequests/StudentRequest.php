<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StudentRequest extends Controller
{
    public function getStudents(Section $section)
    {
        $students = $section->student()->get();
        return response()->json($students);
    }

    public function getStudentBySection(Request $request) 
    {
        $sectionId = $request->input('section_id');

        // Log::info('sectionId', [$sectionId]);

        $students = Student::with('section')->where('section_id', $sectionId)->get();

        return response()->json(['studentsBySection' => $students]);
    }
}
