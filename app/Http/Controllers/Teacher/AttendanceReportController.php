<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ClassSchedule;
use App\Models\Section;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AttendanceReportController extends Controller
{
    protected ?int $sectionId;
    protected ?int $studentId;
    protected ?Student $student;
    protected ?int $quarterId;
    protected ?Carbon $quarterStart;
    protected ?Carbon $quarterEnd;

    public function __construct(Request $request)
    {
        $this->sectionId = $request->input('section');
        $this->quarterId = $request->input('quarter');
        $this->studentId = $request->input('student');

        $this->student = $this->studentId ? Student::find($this->studentId) : null;

        $this->quarterStart = $request->has('quarter_start') 
            ? Carbon::parse($request->input('quarter_start')) 
            : null;

        $this->quarterEnd = $request->has('quarter_end') 
            ? Carbon::parse($request->input('quarter_end')) 
            : null;
    }

    public function reportsToGenerate() 
    {
        // Log::info('SectionID:', [$this->sectionId]);
        // Log::info('StudentID:', [$this->studentId]);
        // Log::info('QuarterID:', [$this->quarterId]);
        // Log::info('Quarter Start Data:', [$this->quarterStart]);
        // Log::info('Quarter End Data:', [$this->quarterEnd]);

        $authUser = Auth::user();
        $teacher  = $authUser->teacher->user;

        $section = Section::find($this->sectionId);

        if ($section && $this->student) {
            $classSchedules = ClassSchedule::where('section_id', $section->id)->get();

            # Prepare an array to hold attendance counts
            $attendanceCounts = [];

            $dayAbbreviations = [
                "Monday"    => "M",
                "Tuesday"   => "T",
                "Wednesday" => "W",
                "Thursday"  => "Th",
                "Friday"    => "F",
                "Saturday"  => "S",
                "Sunday"    => "Su"
            ];

            foreach ($classSchedules as $schedule) {
                # Fetch attendance records for the current class schedule
                $attendancesBySchedule = Attendance::with('attendanceStatus')
                    ->where('class_schedule_id', $schedule->id)
                    ->where('student_id', $this->student->id)
                    ->whereBetween('created_at', [$this->quarterStart, $this->quarterEnd])
                    ->get();

                # Initialize count variables for the current schedule
                $totalPresent   = 0;
                $totalAbsent    = 0;
                $totalLate      = 0;
                $totalExcuse    = 0;

                foreach ($attendancesBySchedule as $attendance) {
                    if ($attendance->attendanceStatus) {
                        switch ($attendance->attendanceStatus->status) {
                            case 'present':
                                $totalPresent++;
                                break;
                            case 'absent':
                                $totalAbsent++;
                                break;
                            case 'late':
                                $totalLate++;
                                break;
                            case 'excuse':
                                $totalExcuse++;
                                break;
                        }
                    }
                }

                # Get the days of the week for the current schedule
                $daysOfWeek = $schedule->daysOfWeek()->get()->pluck('day_name')->toArray();
                $abbreviatedDays = array_map(fn($day) => $dayAbbreviations[$day] ?? '', $daysOfWeek);
                $daysString = implode('', $abbreviatedDays);

                $classStartTime = Carbon::parse($schedule->start_time)->format('h:i A');
                $classEndTime   = Carbon::parse($schedule->end_time)->format('h:i A');  

                $formattedClassSchedule = $schedule->subject . ' (' . $schedule->subject_code . ') - ' . 
                    $daysString . ' (' . $classStartTime . ' - ' . $classEndTime . ')';

                # Store the counts in the array indexed by formatted class schedule
                $attendanceCounts[$formattedClassSchedule] = [
                    'total_present' => $totalPresent,
                    'total_absent'  => $totalAbsent,
                    'total_late'    => $totalLate,
                    'total_excuse'  => $totalExcuse,
                ];
            }
        } else {
            return response()->json(['error' => 'Invalid section or student'], 422);
        }

        # Prepare the response data
        $generatedReports = [
            'teacher'           => $teacher,
            'quarter'           => $this->quarterId,
            'quarter_start'     => $this->quarterStart->toFormattedDateString(),
            'quarter_end'       => $this->quarterEnd->toFormattedDateString(),
            'section'           => $section,
            'student'           => $this->student,
            'attendance_counts' => $attendanceCounts,
        ];

        $pdf = PDF::loadView('layouts.teacher-layouts.contents.report.download.attendance-quarterly-report', compact('generatedReports'));

        $studentName = ($this->student ? $this->student->first_name : '') . '-' . ($this->student ? $this->student->last_name : '');

        # Save the PDF to storage/app/public/ folder
        $pdfPath = strtolower($studentName) . '-attendance-quarterly-report-' . 'q' . $this->quarterId . '-' . date('Y') . '-' . date('H-i-s') . '.pdf';

        $pdf->save(storage_path('app/public/' . $pdfPath));

        # Return the correct public URL (using 'storage' in the asset path)
        return response()->json(['pdf_url' => asset('storage/' . $pdfPath)]);
    }
}
