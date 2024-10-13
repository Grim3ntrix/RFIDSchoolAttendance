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
            <h1>Quarterly Attendance Report</h1>
            <p>Matalom National High School</p>
            <!-- <p>School Year: 2023-2024</p> -->
        </header>

        <section style="margin-bottom: 10px;">
            <h2>Student Information</h2>
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p><strong>Name:</strong> {{ $student['name'] }}</p>
                    <p><strong>Grade Level:</strong> {{ $student['grade_level'] }}</p>
                    <p><strong>Section:</strong> {{ $student['section'] }}</p>
                </div>
                <div>
                    <p><strong>Teacher:</strong> {{ $student['teacher'] }}</p>
                    <!-- <p><strong>School:</strong> {{ $student['school'] }}</p> -->
                    <!-- <p><strong>School Year:</strong> 2023-2024</p> -->
                    <p><strong>Quarter:</strong> </p>
                    <p><strong>Start Date:</strong> </p>
                    <p><strong>End Date:</strong> </p>
                </div>
            </div>
        </section>

        <section>
            <h2>Attendance Record</h2>
            <table>
                <thead>
                    <tr>
                        <!-- <th>Quarter</th> -->
                        <th>Class Schedule</th>
                        <th>Days Present</th>
                        <th>Days Absent</th>
                        <th>Late Classes</th>
                        <th>Excused Classes</th>
                        <!-- <th>Attendance Percentage</th> -->
                        <!-- <th>Remarks</th> -->
                    </tr>
                </thead>
                <tbody>
                    @foreach ($student['attendance'] as $record)
                        <tr>
                            <!-- <td>{{ $record['quarter'] }}</td> -->
                            <td>English (Eng-101) - MTh (07:00 AM - 08:00 AM)</td>
                            <td>{{ $record['days_present'] }}</td>
                            <td>{{ $record['days_absent'] }}</td>
                            <td>{{ $record['late_classes'] }}</td>
                            <td>{{ $record['excused_classes'] }}</td>
                            <!-- <td>{{ $record['attendance_percentage'] }}%</td> -->
                            <!-- <td>{{ $record['remarks'] }}</td> -->
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>

        <!-- <section style="margin-top: 10px;">
            <h2>Summary</h2>
            <div style="display: flex; justify-content: space-between;" class="summary">
                <div>
                    <p><strong>Total Days Present:</strong> {{ $student['total_present'] }}</p>
                    <p><strong>Total Days Absent:</strong> {{ $student['total_absent'] }}</p>
                    <p><strong>Total Late Classes:</strong> {{ $student['total_late'] }}</p>
                    <p><strong>Total Excused Classes:</strong> {{ $student['total_excused'] }}</p>
                </div>
                <div>
                    <p><strong>Final Remarks:</strong> {{ $student['final_remarks'] }}</p>
                </div>
            </div>
        </section> -->

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
    <div class="page-break"></div>

</body>
</html>
