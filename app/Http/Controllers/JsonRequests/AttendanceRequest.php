<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ClassSchedule;
use App\Models\Section;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class AttendanceRequest extends Controller
{
    protected $today;
    protected $user;
    protected $teacher;

    public function __construct()
    {
        $this->today   = Carbon::now();
        // Log::info('today', [$this->today]);

        $this->user    = Auth::user();
        $this->teacher = $this->user->teacher;
    }

    protected function getAttendanceQuery()
    {
        if (!$this->teacher) {
            return response()->json(['error' => 'Teacher not found'], 404);
        }
        
        return Attendance::with('attendanceStatus', 'student', 'classSchedule.section')
            ->whereHas('classSchedule', function ($query) {
                $query->where('teacher_id', $this->teacher->id);
            })
            ->whereDate('created_at', $this->today);
    }

    public function getDailyAttendanceByTeacher()
    {
        $dailyAttendances = $this->getAttendanceQuery()
        ->get();

        // Log::info('dailyAttendances', [$dailyAttendances]);

        return response()->json($dailyAttendances);
    }

    public function getAttendanceCountByTeacher()
    {
        $dailyAttendanceCount = $this->getAttendanceQuery()
        ->count();

        return response()->json($dailyAttendanceCount);
    }

    public function getDailyAttendanceForPieChart($sectionId)
    {
        $section = Section::find($sectionId);

        if ($section) {
            $classSchedules = ClassSchedule::where('section_id', $section->id)->get();

            if ($classSchedules->isNotEmpty()) {
                # array of class schedule IDs
                $classScheduleIds = $classSchedules->pluck('id');

                // Log::info('classScheduleIds', [$classScheduleIds]);
                // Log::info('today', [$this->today]);
            
                $attendancesBySchedule = Attendance::with('attendanceStatus')
                    ->whereIn('class_schedule_id', $classScheduleIds)
                    ->whereDate('created_at', $this->today)
                    ->get(); # Execute the query, ayaw ni kalimti basta query builder gani when you create the query for $attendancesBySchedule, 
                             # it's an instance of the query builder and does not hold the actual results until you call get().

                // Log::info('attendancesBySchedule-Get', [$attendancesBySchedule]);

                $total = $attendancesBySchedule->count();

                $present = $attendancesBySchedule->where('attendanceStatus.status', 'present')->count();
                $late    = $attendancesBySchedule->where('attendanceStatus.status', 'late')->count();
                $absent  = $attendancesBySchedule->where('attendanceStatus.status', 'absent')->count();
                $excuse  = $attendancesBySchedule->where('attendanceStatus.status', 'excuse')->count();
            
            } else {
                $attendancesBySchedule = collect();
                $total                 = 0;
                $present               = $late = $absent = $excuse = 0;
            }
            
            // Log::info('attendancesBySchedule-Count', [$total]);
            // Log::info('attendancesBySchedule-present', [$present]);
            // Log::info('attendancesBySchedule-late', [$late]);
            // Log::info('attendancesBySchedule-absent', [$absent]);
            // Log::info('attendancesBySchedule-excuse', [$excuse]);

            $presentPercentage = $total > 0 ? ($present / $total) * 100 : 0;
            $latePercentage    = $total > 0 ? ($late / $total) * 100 : 0;
            $absentPercentage  = $total > 0 ? ($absent / $total) * 100 : 0;
            $excusePercentage  = $total > 0 ? ($excuse / $total) * 100 : 0;

            // Log::info('present Percentage', [$presentPercentage]);
            // Log::info('late Percentage', [$latePercentage]);
            // Log::info('absent Percentage', [$absentPercentage]);
            // Log::info('excuse Percentage', [$excusePercentage]);

            return response()->json([
                'total' => $total,
                'presentPercentage' => $presentPercentage,
                'latePercentage'    => $latePercentage,
                'absentPercentage'  => $absentPercentage,
                'excusePercentage'  => $excusePercentage,
            ]);
        }

        return response()->json(['error' => 'Section not found'], 404);
    }

    public function reviewStudentAttendanceByClassSchedule(Request $request)
    {
        $studentId = $request->input('student_id');
        $classScheduleId = $request->input('class_schedule_id');

        // Log::info('studentId', [$studentId]);
        // Log::info('classScheduleId', [$classScheduleId]);

       $attendances = Attendance::with('attendanceStatus')
       ->where('student_id', $studentId)
       ->where('class_schedule_id', $classScheduleId)
       ->get();

    //    Log::info('attendances', [$attendances]);

       return response()->json(['attendances' => $attendances]);
    }

}
