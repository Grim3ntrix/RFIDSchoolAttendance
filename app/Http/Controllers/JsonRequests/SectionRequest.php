<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SectionRequest extends Controller
{
    public function getSections()
    {
        $user = Auth::user();
        $teacher = $user->teacher;

        $sections = Section::where('teacher_id', $teacher->id)
        ->get();

        return response()->json($sections);
    }
}
