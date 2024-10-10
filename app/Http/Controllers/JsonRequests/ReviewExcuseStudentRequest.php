<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewExcuseStudentRequest extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function getStudentExcuseRequestToReview()
    {
        $teacher = $this->user->teacher;
        
        $excuseRequestByStudentToReview = $teacher->classSchedule()->with([
            'excuseRequest',  'excuseRequest.excuseRequestStatus', 'excuseRequest.student',  
        ])->get();

        return response()->json($excuseRequestByStudentToReview);
    }
}
