<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class AttendanceReportController extends Controller
{
    public function generateReport()
{
    // Sample attendance records including late and excused classes
    $attendanceRecords = [
        ['quarter' => 'Quarter 1', 'days_present' => 45, 'days_absent' => 5, 'late_classes' => 2, 'excused_classes' => 1, 'remarks' => 'Good'],
        ['quarter' => 'Quarter 2', 'days_present' => 48, 'days_absent' => 2, 'late_classes' => 1, 'excused_classes' => 0, 'remarks' => 'Excellent'],
        ['quarter' => 'Quarter 3', 'days_present' => 46, 'days_absent' => 4, 'late_classes' => 3, 'excused_classes' => 2, 'remarks' => 'Satisfactory'],
        ['quarter' => 'Quarter 4', 'days_present' => 44, 'days_absent' => 6, 'late_classes' => 4, 'excused_classes' => 1, 'remarks' => 'Needs Improvement'],
    ];

    // Calculate totals
    $totalClasses = 0;
    $totalPresent = 0;
    $totalAbsent = 0;
    $totalLate = 0;
    $totalExcused = 0;

    foreach ($attendanceRecords as $record) {
        $totalPresent += $record['days_present'];
        $totalAbsent += $record['days_absent'];
        $totalLate += $record['late_classes'];
        $totalExcused += $record['excused_classes'];
        $totalClasses += ($record['days_present'] + $record['days_absent']);
    }

    // Add attendance percentage to each record
    foreach ($attendanceRecords as &$record) {
        $record['attendance_percentage'] = $totalClasses ? round(($record['days_present'] / $totalClasses) * 100, 2) : 0;
    }

    // Sample student information
    $student = [
        'name' => 'Dodong',
        'grade_level' => 'Grade 10',
        'section' => 'Rizal',
        'teacher' => 'Bugwak Pasaway',
        'school' => 'Matalom National High School',
        'attendance' => $attendanceRecords,
        'total_present' => $totalPresent,
        'total_absent' => $totalAbsent,
        'total_late' => $totalLate,
        'total_excused' => $totalExcused,
        'final_remarks' => 'Needs Improvement in Attendance',
    ];

    // Load the view for the PDF
    $pdf = PDF::loadView('layouts.teacher-layouts.contents.report.download.attendance-quarterly-report', compact('student'));

    // Return the generated PDF
    return $pdf->stream('attendance_quarterly_report.pdf');
}

}
