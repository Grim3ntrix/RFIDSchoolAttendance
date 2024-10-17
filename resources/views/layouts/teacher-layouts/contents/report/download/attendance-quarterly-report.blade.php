<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quarterly Attendance Report</title>
    <style>
        @page {
            size: A4; /* A4 size */
            margin: 0; /* Adjust margins if needed */
        }
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            color: #333;
            font-size: 12px; /* Default font size for better fitting */
        }
        .page-break {
            page-break-after: always;
        }
        header, section {
            padding: 10px; /* Reduced padding for better fitting */
        }
        h1 {
            font-size: 20px; /* Reduced font size for title */
            margin-bottom: 5px;
        }
        h2 {
            font-size: 16px; /* Reduced font size for section titles */
            font-weight: bold;
            margin-bottom: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px; /* Smaller font size for table */
        }
        th, td {
            border: 1px solid #ccc;
            padding: 5px; /* Reduced padding for table cells */
            text-align: center; /* Center align all cells */
        }
        th {
            background-color: #f0f0f0; /* Header background color */
        }
        .summary div {
            margin-bottom: 5px; /* Spacing for summary section */
        }
    </style>
</head>
<body>

    <div style="padding: 20px; max-width: 1000px;">
        <header style="text-align: center; margin-bottom: 10px;">
            <p style="background-color: #1877F2; border-radius: 20px; font-weight: 500; padding: 2px 6px; color: white; font-family: Arial; font-size: 12px; text-align: center; display: inline-flex; align-items: center; margin: 0;">
                rfidschoolattendance.online
            </p>
            <h1 style="font-size: 24px; font-family: Arial; margin: 10px 0;">Quarterly Attendance Report</h1>
            <p style="font-size: 14px">Matalom National High School</p>
        </header>

        <section style="margin-bottom: 10px;">
            <h2>Student Information</h2>
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p><strong>Name:</strong> {{ $generatedReports['student']->first_name }} {{ $generatedReports['student']->last_name }}</p>
                    <p><strong>Grade Level:</strong> {{ $generatedReports['section']->grade_or_year_level }}</p>
                    <p><strong>Section:</strong> {{ $generatedReports['section']->section_name }}</p>
                </div>
                <div>
                    <p><strong>Teacher:</strong> {{ $generatedReports['teacher']->name }}</p>
                    <p><strong>Quarter:</strong> {{ $generatedReports['quarter'] }}</p>
                    <p><strong>Start Date:</strong> {{ $generatedReports['quarter_start'] }}</p>
                    <p><strong>End Date:</strong> {{ $generatedReports['quarter_end'] }}</p>
                </div>
            </div>
        </section>

        <section>
            <h2>Attendance Record</h2>
            <table>
                <thead>
                    <tr>
                        <th>Class Schedule</th>
                        <th>Days Present</th>
                        <th>Days Absent</th>
                        <th>Late Classes</th>
                        <th>Excused Classes</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($generatedReports['attendance_counts'] as $classSchedule => $attendanceCount)
                        <tr>
                            <td>{{ $classSchedule }}</td>
                            <td>{{ $attendanceCount['total_present'] }}</td>
                            <td>{{ $attendanceCount['total_absent'] }}</td>
                            <td>{{ $attendanceCount['total_late'] }}</td>
                            <td>{{ $attendanceCount['total_excuse'] }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>

        <section style="margin-top: 5px;">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p><strong>Final Remarks:</strong> </p>
                </div>
            </div>
        </section>

        <section style="margin-top: 10px; display: flex; justify-content: space-between;">
            <div>
                <p>______________________________</p>
                <p style="font-size: 10px;">Teacher's Signature</p>
            </div>
            <div>
                <p>______________________________</p>
                <p style="font-size: 10px;">Parent's/Guardian's Signature</p>
            </div>
        </section>

    </div>
    <!-- <div class="page-break"></div> -->
</body>
</html>
