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

        # Display student Locations in the table
        $sectionsWithStudents = Section::with([
                                    'student.user.userstatus', 
                                    'student.studentLocation.studentLocationStatus'
                                ])
                                ->where('teacher_id', $teacher->id)
                                ->whereHas('student.user.userstatus', function($query) {
                                    $query->orderByRaw("CASE WHEN status = 'online' THEN 1 ELSE 0 END DESC");
                                })
                                ->get();

        return response()->json($sectionsWithStudents);
    }
}
