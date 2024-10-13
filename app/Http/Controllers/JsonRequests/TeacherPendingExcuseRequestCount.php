<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TeacherPendingExcuseRequestCount extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function countPendingExcuseRequests()
    {
        $pendingCount = 0;

        $classSchedules = $this->user->teacher
            ? $this->user->teacher->classSchedule()
                ->with('excuseRequest.excuseRequestStatus')
                ->whereHas('excuseRequest', function ($query) {
                    $query->whereHas('excuseRequestStatus', function ($q) {
                        $q->where('status', 'pending');
                    });
                })
                ->get()
            : [];

        if ($classSchedules) {
            foreach ($classSchedules as $schedule) {
                if ($schedule->excuseRequest) {
                    $pendingCount += $schedule->excuseRequest->where('excuseRequestStatus.status', 'pending')->count();
                }
            }
        }

        return response()->json(['pendingExcuseRequestCount' => $pendingCount]);
    }
}
