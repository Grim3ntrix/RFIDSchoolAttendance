<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

class ReportController extends Controller
{
    public function index()
    {
        return view('layouts.teacher-layouts.contents.report.index-report');
    }
    
}
