<?php

namespace App\Console\Commands;

use App\Models\{
    Attendance,
    AttendanceStatus,
    ClassSchedule,
};
use Carbon\Carbon;
use Illuminate\Console\Command;

class MarkAbsentStudents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:mark-absent-students';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mark absent students who have not attended class for the day';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentTime = Carbon::now()->format('H:i:s'); # Extracts current time as '14:45:00'
        
        $classSchedules = ClassSchedule::where('end_time', '<=', $currentTime)->get();

        foreach ($classSchedules as $classSchedule) {
            $this->markAbsentStudentsForClassSchedule($classSchedule->id);
        }
    }

    public function markAbsentStudentsForClassSchedule($classScheduleId)
    {
        $classSchedule = ClassSchedule::findOrFail($classScheduleId);

        if (!$classSchedule) {
            return; # If the class schedule is invalid, exit the function.
        }

        $currentDate = Carbon::now()->format('Y-m-d');

        $attendanceStatus = AttendanceStatus::where('status', 'absent')->first();

        if (!$attendanceStatus) {
            return; # If the attendance status is invalid, exit the function.
        }

        $classSchedule->section->student()->chunk(100, function ($students) use ($classScheduleId, $attendanceStatus, $currentDate) {
            
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
                // Bulk insert attendance records
                Attendance::insert($attendancesToCreate);
            }
            
        });
    }
}