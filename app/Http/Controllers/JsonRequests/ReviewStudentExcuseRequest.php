<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ReviewStudentExcuseRequest extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function getStudentExcuseRequestToReview()
    {
        $excuseRequestByStudentToReview = $this->user->teacher
            ? $this->user->teacher->classSchedule()
                ->with([
                    'section',
                    'teacher:id,user_id,first_name,middle_name,last_name,name_extension',
                    'teacher.user:id,name',
                    'daysOfWeek',
                    'excuseRequest' => function ($query) {
                        # Ensure to only fetch excuse requests with 'pending' status
                        $query->whereHas('excuseRequestStatus', function ($q) {
                            $q->where('status', 'pending');
                        });
                    },
                    'excuseRequest.excuseRequestStatus:id,status',
                    'excuseRequest.student:id,first_name,middle_name,last_name,name_extension',
                ])
                ->whereHas('excuseRequest', function ($query) {
                    # Ensure class schedules have at least one 'pending' excuse request
                    $query->whereHas('excuseRequestStatus', function ($q) {
                        $q->where('status', 'pending');
                    });
                })
                ->get() ?? []
            : [];

        return response()->json($excuseRequestByStudentToReview);
    }
}
