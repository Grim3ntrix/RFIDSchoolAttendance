<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\AttendanceStatus;
use App\Models\ExcuseRequest;
use App\Models\ExcuseRequestStatus;
use Illuminate\Support\Facades\DB;

class ApproveStudentExcuseRequestController extends Controller
{
    public function attendanceMarkExcuse($attendanceId)
    {
        DB::beginTransaction();
        
        try {
            $attendanceStatus = AttendanceStatus::where('status', 'excuse')->first();
            $attendance       = Attendance::where('id', $attendanceId)->first();

            // Check if attendance exists
            if (!$attendance) {
                return response()->json(['message' => 'Attendance not found!'], 404);
            }

            // Update attendance status
            $attendance->update([
                'student_id'        => $attendance->student_id,
                'class_schedule_id' => $attendance->class_schedule_id,
                'status_id'         => $attendanceStatus->id,
            ]);

            // Update the excuse request status
            $excuseRequestStatus = ExcuseRequestStatus::where('status', 'approved')->first();
            $excuseRequest       = ExcuseRequest::where('student_id', $attendance->student_id)
                                          ->where('class_schedule_id', $attendance->class_schedule_id)
                                          ->first();

            if ($excuseRequest) {
                $excuseRequest->update([
                    'status_id' => $excuseRequestStatus->id,
                ]);
            }

            // Commit the transaction
            DB::commit();

            return response()->json([
                'message' => 'Attendance status updated to excused successfully!',
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction if something fails
            DB::rollBack();
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}
