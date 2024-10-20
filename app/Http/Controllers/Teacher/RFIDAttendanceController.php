<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\{
    Attendance,
    AttendanceStatus,
    ClassSchedule,
    Student,
};
use Carbon\Carbon;
use Illuminate\Http\Request;

class RFIDAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('layouts.teacher-layouts.contents.rfid-attendance.index-rfid-attendance');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $student       = Student::where('rfid_serial_number', $request->rfid_serial_number)->first();
        $classSchedule = ClassSchedule::findOrFail($request->class_schedule);

        if (!$classSchedule) {
            return response()->json([
                'error' => 'The selected class schedule is invalid.'
            ], 422);
        }

        $currentTimeStr = Carbon::now('Asia/Manila')->toTimeString();
        $classStartTime = Carbon::parse($classSchedule->start_time);
        $classEndTime   = Carbon::parse($classSchedule->end_time);
        $currentTimeObj = Carbon::parse($currentTimeStr);

        # Info: 
            # 1. dayOfWeek() means, 0 (for Sunday) through 6 (for Saturday).
            # 2. dayOfWeekIso() means, 1 (for Monday) through 7 (for Sunday).

        $dayMapping = [
            0 => 1, # Sunday
            1 => 2, # Monday
            2 => 3, # Tuesday
            3 => 4, # Wednesday
            4 => 5, # Thursday
            5 => 6, # Friday
            6 => 7  # Saturday
        ];
        
        $currentDayId = $dayMapping[now()->setTimezone('Asia/Manila')->dayOfWeek];

        $validated = $request->validate([
            'section'            => 'required',
            'class_schedule'     => 'required|exists:class_schedules,id',
            'rfid_serial_number' => [
                'required',
                'exists:students,rfid_serial_number',
                function ($attribute, $value, $fail) use ($classSchedule, $classStartTime, $classEndTime, $currentTimeObj) {
                    $formattedStartTime = $classStartTime->format('g:i A');
                    $formattedEndTime   = $classEndTime->format('g:i A');

                    if ($currentTimeObj->isBefore($classStartTime)) {
                        return $fail('Class hasn\'t started yet! Please come back at ' . $formattedStartTime . '.');
                    } elseif ($currentTimeObj->isAfter($classEndTime)) {
                        return $fail('Class has already ended! It finished at ' . $formattedEndTime . '.');
                    }
                },
                function ($attribute, $value, $fail) use ($request) {
                    $attendanceExists = Attendance::where('rfid_serial_number', $value)
                        ->where('class_schedule_id', $request->class_schedule)
                        ->whereDate('created_at', now())
                        ->exists();
                    
                    if ($attendanceExists) {
                        $fail('Oops! You already have an attendance entry for today\'s class schedule.');
                    }
                },
                // Check if the current day matches the class schedule's days
                function ($attribute, $value, $fail) use ($classSchedule, $currentDayId) {

                    # This query cause an issue "Column 'id' in field list is ambiguous, it is because you are in two tables and both of them have a column "id" nako po!
                    // $scheduleDays = $classSchedule->daysOfWeek()->pluck('id')->toArray();

                    $scheduleDays = $classSchedule->daysOfWeek()->pluck('days_of_weeks.id')->toArray();

                    // Day names mapping for display purposes
                    $dayNamesMapping = [
                        1 => 'Sunday',
                        2 => 'Monday',
                        3 => 'Tuesday',
                        4 => 'Wednesday',
                        5 => 'Thursday',
                        6 => 'Friday',
                        7 => 'Saturday',
                    ];
                    
                    // Convert scheduled day IDs to their names
                    $assignedDays = array_map(function($dayId) use ($dayNamesMapping) {
                        return $dayNamesMapping[$dayId];
                    }, $scheduleDays);

                    // Create a comma-separated string of the assigned days
                    $formattedDays = implode(', ', $assignedDays);

                    // Check if the current day matches any of the scheduled days
                    if (!in_array($currentDayId, $scheduleDays)) {
                        // Fail with a message including the assigned days
                        $fail('Attendance is only acceptable on the scheduled class days: ' . $formattedDays . '.');
                    }
                },
            ],
        ], [
            'rfid_serial_number.exists' => 'Oops! This RFID serial number isn\'t registered to any student. Please double-check and try again.',
        ]);

        $attendanceStatus = null;

        if ($currentTimeObj->isBetween($classStartTime->copy()->addMinutes(16), $classStartTime)) {
            $attendanceStatus = AttendanceStatus::where('status', 'present')->first();
        } else {
            $attendanceStatus = AttendanceStatus::where('status', 'late')->first();
        }

        if ($attendanceStatus) {
            $attendance = new Attendance([
                'student_id'         => $student->id,
                'class_schedule_id'  => $request->class_schedule,
                'rfid_serial_number' => $validated['rfid_serial_number'],
                'status_id'          => $attendanceStatus->id,
            ]);

            $attendance->save();
        
            return response()->json([
                'message' => 'Attendance saved successfully',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Attendance status could not be determined.',
            ], 422);
        }
    }
}
