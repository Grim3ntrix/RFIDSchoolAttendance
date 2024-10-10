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

        $validated = $request->validate([
            'section'            => 'required',
            'class_schedule'     => 'required|exists:class_schedules,id',
            'rfid_serial_number' => [
                'required',
                'exists:students,rfid_serial_number',
                function ($attribute, $value, $fail) use ($request) {
                    $attendanceExists = Attendance::where('rfid_serial_number', $value)
                        ->where('class_schedule_id', $request->class_schedule)
                        ->whereDate('created_at', now())
                        ->exists();
                    
                    if ($attendanceExists) {
                        $fail('Oops! You already have an attendance entry for today\'s class schedule.');
                    }
                },
                function ($attribute, $value, $fail) use ($classSchedule, $classStartTime, $classEndTime, $currentTimeObj) {
                    $formattedStartTime = $classStartTime->format('g:i A');
                    $formattedEndTime   = $classEndTime->format('g:i A');

                    if ($currentTimeObj->isBefore($classStartTime)) {
                        return $fail('Class hasn\'t started yet! Please come back at ' . $formattedStartTime . '.');
                    } elseif ($currentTimeObj->isAfter($classEndTime)) {
                        return $fail('Class has already ended! It finished at ' . $formattedEndTime . '.');
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
