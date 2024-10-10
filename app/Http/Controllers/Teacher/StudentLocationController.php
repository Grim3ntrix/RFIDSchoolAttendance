<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

class StudentLocationController extends Controller
{
    public function index()
    {
        return view('layouts.teacher-layouts.contents.student-location.index-student-location');
    }
}
