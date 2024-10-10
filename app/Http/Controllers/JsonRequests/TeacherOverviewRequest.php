<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Support\Facades\Auth;

class TeacherOverviewRequest extends Controller
{
    protected $user;
    protected $teacher;
    protected $sections;

    public function __construct()
    {
        $this->user     = Auth::user();
        $this->teacher  = $this->user->teacher;

        $this->sections = Section::with(['classSchedule', 'student'])
            ->where('teacher_id', $this->teacher->id)
            ->get();
    }

    public function getTotalSections()
    {
        $totalSections = $this->sections->count();

        return response()->json([
            'total_sections' => $totalSections,
        ]);
    }

    public function getTotalSubjects()
    {
        $totalSubjects = $this->sections->sum(function ($section) {
            return $section->classSchedule->count();
        });

        return response()->json([
            'total_subjects' => $totalSubjects,
        ]);
    }

    public function getTotalStudents()
    {
        $totalStudents = $this->sections->sum(function ($section) {
            return $section->student->count();
        });

        return response()->json([
            'total_students' => $totalStudents,
        ]);
    }

    public function getOnGoingClassSchedule()
    {
        $classSchedules = [];

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

        foreach ($this->sections as $section) {
            $orderedSchedules = $section->classSchedule()
                ->with(['section', 'daysOfWeek'])
                ->whereHas('daysOfWeek', function ($query) use ($currentDayId) {
                    $query->where('days_of_weeks.id', $currentDayId);
                })
                ->orderBy('start_time')
                ->get();
        
            // Add each schedule to the array
            foreach ($orderedSchedules as $schedule) {
                $scheduleArray = $schedule->toArray();
                $classSchedules[] = $scheduleArray;  
            }
        }

        return response()->json([
            'class_schedules' => $classSchedules,
        ]);
    }

}
