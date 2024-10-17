<?php

namespace App\Console\Commands;

use App\Models\{
    Attendance,
    AttendanceStatus,
    ClassSchedule
};
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class MarkAbsentStudents extends Command
{
    protected $signature = 'app:mark-absent-students';
    protected $description = 'Mark absent students who have not attended class for the day';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $currentTime = Carbon::now('Asia/Manila')->format('H:i:s'); // Match timezone
        $currentDayId = $this->getCurrentDayId(); // Get current day ID (1-7)

        Log::info("MarkAbsentStudents command started at {$currentTime}.");

        // Find class schedules that end before or at the current time and match today's day
        $classSchedules = ClassSchedule::where('end_time', '<=', $currentTime)
            ->whereHas('daysOfWeek', function ($query) use ($currentDayId) {
                $query->where('days_of_weeks.id', $currentDayId);
            })
            ->get();

        Log::info('Class schedules retrieved for processing.', ['count' => $classSchedules->count()]);

        foreach ($classSchedules as $classSchedule) {
            Log::info("Processing class schedule", ['class_schedule_id' => $classSchedule->id]);
            $this->markAbsentStudentsForClassSchedule($classSchedule->id);
        }

        Log::info('MarkAbsentStudents command completed.');
    }

    private function getCurrentDayId()
    {
        # Info: 
            # 1. dayOfWeek() means, 0 (for Sunday) through 6 (for Saturday).
            # 2. dayOfWeekIso() means, 1 (for Monday) through 7 (for Sunday).

        $dayMapping = [
            0 => 1, // Sunday
            1 => 2, // Monday
            2 => 3, // Tuesday
            3 => 4, // Wednesday
            4 => 5, // Thursday
            5 => 6, // Friday
            6 => 7  // Saturday
        ];

        // Map the current day of the week to the 'days_of_weeks' table
        return $dayMapping[Carbon::now('Asia/Manila')->dayOfWeek];
    }

    public function markAbsentStudentsForClassSchedule($classScheduleId)
    {
        $classSchedule = ClassSchedule::find($classScheduleId);
        if (!$classSchedule) {
            Log::warning("Class schedule not found", ['class_schedule_id' => $classScheduleId]);
            return;
        }

        $currentDate = Carbon::now()->format('Y-m-d');
        $attendanceStatus = AttendanceStatus::where('status', 'absent')->first();

        if (!$attendanceStatus) {
            Log::error("Attendance status 'absent' not found.");
            return;
        }

        $classSchedule->section->student()->chunk(100, function ($students) use ($classScheduleId, $attendanceStatus, $currentDate) {
            Log::info("Processing students chunk", ['class_schedule_id' => $classScheduleId, 'student_count' => count($students)]);
            
            $attendancesToCreate = [];

            foreach ($students as $student) {
                $attendanceExists = Attendance::where('student_id', $student->id)
                    ->where('class_schedule_id', $classScheduleId)
                    ->whereDate('created_at', $currentDate)
                    ->exists();

                if (!$attendanceExists) {
                    $attendancesToCreate[] = [
                        'student_id'        => $student->id,
                        'class_schedule_id' => $classScheduleId,
                        'rfid_serial_number'=> $student->rfid_serial_number,
                        'status_id'         => $attendanceStatus->id,
                        'created_at'        => now(),
                        'updated_at'        => now(),
                    ];
                }
            }

            if (!empty($attendancesToCreate)) {
                Attendance::insert($attendancesToCreate);
                Log::info('Attendance records inserted successfully.', ['record_count' => count($attendancesToCreate)]);
                $this->info('Successfully inserted attendance records for absent students.');
            } else {
                $this->warn('No attendance records were provided for insertion.');
            }
        });
    }
}
