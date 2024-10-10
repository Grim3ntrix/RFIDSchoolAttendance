<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Section;

use Illuminate\Support\Facades\Auth;

class StudentLocationByTeacherRequest extends Controller
{
    public function getStudentLocationsByTeacher()
    {
        $user    = Auth::user();
        $teacher = $user->teacher;

        $sectionsWithStudents = Section::with(['student.user.userstatus', 'student.studentLocation.studentLocationStatus'])
                            ->where('teacher_id', $teacher->id)
                            ->get();
       
        return response()->json($sectionsWithStudents);
    }
}
