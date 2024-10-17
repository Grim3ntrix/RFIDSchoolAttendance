<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class StudentOverviewRequest extends Controller
{

    public function getStudentClassSchedules()
    {
        $user    = Auth::user();
        $student = $user->student;
        $section = $student->section;

        $classScheduleStudentOverview = ClassSchedule::with('section', 'daysOfWeek')
        ->where('section_id', $student->section_id)
        ->get();

        return response()->json([
            'classScheduleStudentOverview' => $classScheduleStudentOverview,
            'section'                      => $section,
        ]);
    }

    public function getAttendanceStatusTotals(Request $request)
    {
        // Retrieve parameters from the request
        $classScheduleId = $request->query('classScheduleId');
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');

        // Log::info('classScheduleId', [$classScheduleId]);
        // Log::info('startDate', [$startDate]);
        // Log::info('endDate', [$endDate]);

        $classSchedule = ClassSchedule::find($classScheduleId);

        // Log::info('classSchedule', [$classSchedule]);

        if ($classSchedule) {
            $ClassScheduleAttendances = $classSchedule->attendance()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();
        }

        $totalPresent = 0;
        $totalLate    = 0;
        $totalAbsent  = 0;
        $totalExcuse  = 0;

        foreach ($ClassScheduleAttendances as $classAttendance) {
            if ($classAttendance->attendanceStatus) {

                switch ($classAttendance->attendanceStatus->status) {
                    case 'present':
                        $totalPresent++;
                        break;
                    case 'late':
                        $totalLate++;
                        break;
                    case 'absent':
                        $totalAbsent++;
                        break;
                    case 'excuse':
                        $totalExcuse++;
                        break;
                }
                
            }
        }

        // Log::info('totalPresent', [$totalPresent]);
        // Log::info('totalLate', [$totalLate]);
        // Log::info('totalAbsent', [$totalAbsent]);
        // Log::info('totalExcuse', [$totalExcuse]);

        return response()->json([
            'totalPresent' => $totalPresent,
            'totalLate'    => $totalLate,
            'totalAbsent'  => $totalAbsent,
            'totalExcuse'  => $totalExcuse,
        ]);
    }
}
