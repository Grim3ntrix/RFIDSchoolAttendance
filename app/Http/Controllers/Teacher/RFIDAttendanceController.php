<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\AttendanceStatus;
use App\Models\ClassSchedule;
use App\Models\Student;
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $classSchedule  = ClassSchedule::find($request->class_schedule); # Retrieve the class schedule
        $currentTime    = Carbon::now();                                     # Get the current time and the class start/end times
        $classStartTime = Carbon::parse($classSchedule->start_time);
        $classEndTime   = Carbon::parse($classSchedule->end_time);

        $validated = $request->validate([
            'class_schedule'     => 'required|exists:class_schedules,id',
            'rfid_serial_number' => [
                'required',
                'string',
                'exists:students,rfid_serial_number',
                function ($attribute, $value, $fail) use ($currentTime, $classStartTime, $classEndTime) {
                    if ($currentTime->isBefore($classStartTime)) {
                        return $fail('Snap! Class time has not started, please try again later!');
                    }

                    if ($currentTime->isAfter($classEndTime)) {
                        return $fail('Snap! Class time has ended, please try again later!');
                    }
                },
            ],
        ], [
            'rfid_serial_number.exists' => 'Snap! RFID serial number not registered to any student. Please try again!',
        ]);

        $student     = Student::where('rfid_serial_number', $request->rfid_serial_number)->first();
        $currentTime = now(); // Get the current time

        $presentStatusId = AttendanceStatus::where('status', 'present')->first()->id; # Retrieve status IDs for later use
        $lateStatusId    = AttendanceStatus::where('status', 'late')->first()->id;
        $absentStatusId  = AttendanceStatus::where('status', 'absent')->first()->id; 

        # Determine the status based on time comparisons
        if ($currentTime->isBefore($classStartTime)) {
            $statusId = $absentStatusId;                    # Before the start time (absent)
        } elseif ($currentTime->isBetween($classStartTime->subMinutes(15), $classStartTime)) {
            $statusId = $lateStatusId;                      # Within 15 minutes before the start time (marked as late)
        } elseif ($currentTime->isBetween($classStartTime, $classEndTime)) {
            $statusId = $presentStatusId;                   # During class time (present)
        } else {
            $statusId = $absentStatusId;                    # After the end time (absent)
        }

        $attendance = new Attendance();
        $attendance->class_schedule_id  = $classSchedule->id;
        $attendance->student_id         = $student->id; 
        $attendance->rfid_serial_number = $request->rfid_serial_number;
        $attendance->status_id          = $statusId;
        $attendance->save();

        return response()->json(['message' => 'Attendance saved successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
