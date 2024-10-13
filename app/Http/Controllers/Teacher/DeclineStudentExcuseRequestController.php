<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\ExcuseRequest;
use App\Models\ExcuseRequestStatus;

class DeclineStudentExcuseRequestController extends Controller
{
    public function declineStudentExcuseRequest($classScheduleId)
    {
        $excuseRequestStatus = ExcuseRequestStatus::where('status', 'rejected')->first();
        $excuseRequest       = ExcuseRequest::where('class_schedule_id', $classScheduleId)
        ->whereHas('excuseRequestStatus', function($query) {
            $query->where('status', 'pending');
        })
        ->first();

        // Check if attendance exists
        if (!$excuseRequest) {
            return response()->json(['message' => 'Excuse Request not found!'], 404);
        }

        $excuseRequest->update([
            'student_id'        => $excuseRequest->student_id,
            'class_schedule_id' => $excuseRequest->class_schedule_id,
            'status_id'         => $excuseRequestStatus->id,
        ]);

        return response()->json([
            'message' => 'Excuse request rejected successfully!',
        ]);
    }
}
