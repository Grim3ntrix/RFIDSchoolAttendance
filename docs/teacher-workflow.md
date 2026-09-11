# Teacher Workflow

## Role Overview

Teachers are the primary users who manage day-to-day school operations. After the Super Admin pre-registers a teacher and the teacher completes registration, they are assigned the `teacher` role via Spatie Permission.

Teacher accounts are created by the Super Admin through the Pre-Registered Teachers management page. Once registered, the teacher can log in and access all teacher-specific features.

---

## Seeded Test Account

A teacher account is pre-seeded via `database/seeders/UserSeeder.php`, mirroring the real flow (pre-registered as `T-2026-0001`, then registered):

| Field    | Value             |
|----------|-------------------|
| Email    | teacher@gmail.com |
| Password | TEpassword        |

The seeded teacher owns one section ("Rizal", Grade 10) with one enrolled student (`student@gmail.com` — see the [Student Workflow](./student-workflow.md)), so section and student management have data to work with after `php artisan migrate:fresh --seed`.

> **Testing vs. real-world login:**
>
> - **Testing (seeded):** log in with `teacher@gmail.com` / `TEpassword`.
> - **Real-world:** log in with the email and password the teacher chose during registration — there is no default password, and the email is whatever they registered with.

---

## Routes & Middleware

All Teacher routes are prefixed with `/teacher` and protected by:

- `auth` — must be logged in
- `verified` — email must be verified
- `role:teacher` — must have the `teacher` role

Section-specific routes (students, class schedules) are further protected by `ensure_teacher_section_ownership`, which verifies that the authenticated teacher owns the section being accessed.

See `routes/web.php` lines 82–164.

---

## Pages & Features

### 1. Overview (`/teacher/overview`)

**View:** `layouts.teacher-layouts.contents.overview`

Displays:

- **Total Students** — count of all students across the teacher's sections
- **Total Subjects** — count of unique subjects taught
- **Total Sections** — count of sections managed by the teacher
- **Today's Attendance** — pie chart showing Present / Late / Absent distribution (filterable by section)
- **Ongoing Class Schedule** — shows class schedules that are currently in progress

AJAX endpoints:
- `GET /teacher/total-sections`
- `GET /teacher/total-subjects`
- `GET /teacher/total-students`
- `GET /teacher/ongoing-class-schedule`
- `GET /teacher/sections-record` — for pie chart section dropdown
- `GET /teacher/sections/{sectionId}` — daily attendance for pie chart

---

### 2. RFID Attendance (`/teacher/rfid-attendances`)

**View:** `layouts.teacher-layouts.contents.rfid-attendance.index-rfid-attendance`

Teachers use RFID scanners to capture student attendance. The system validates:

1. The RFID serial number exists in the `students` table.
2. The selected class schedule exists.
3. The current time is within the class schedule's time window.
4. The current day matches one of the scheduled class days.
5. The student has not already been marked present for today's class schedule.

**Attendance Status Logic:**
- **Present** — if the student scans within the first 15 minutes after class start time.
- **Late** — if the student scans after the 15-minute grace period but before the class ends.

| Route                              | Method | Purpose                              |
|------------------------------------|--------|--------------------------------------|
| `GET /teacher/rfid-attendances`    | index  | Show attendance page                 |
| `POST /teacher/rfid-attendances`   | store  | Process RFID scan and mark attendance|

AJAX:
- `GET /teacher/sections-record` — section dropdown
- `GET /teacher/class-schedules/{sectionId}` — class schedule dropdown filtered by section
- `POST /teacher/students-by-section` — student list filtered by section
- `GET /teacher/students/daily-attendances` — attendance records filtered by section
- `GET /teacher/students/daily-attendances/counts` — attendance counts for charts

---

### 3. Section Management (`/teacher/sections`)

**View:** `layouts.teacher-layouts.contents.student-management.section.index-section`

Teachers create and manage their class sections.

| Route                     | Method | Purpose                        |
|---------------------------|--------|--------------------------------|
| `GET /teacher/sections`   | index  | List sections                  |
| `POST /teacher/sections`  | store  | Create new section             |
| `GET /teacher/sections/{id}/edit` | edit | Edit modal data         |
| `PUT /teacher/sections/{id}` | update | Update section             |
| `DELETE /teacher/sections/{id}` | destroy | Delete section          |

AJAX:
- `GET /teacher/sections/records`

**Business Rule:** Section names must be unique per teacher per grade/year level.

When a section is deleted, all associated students (and their user accounts) are also deleted.

---

### 4. Student Management (`/teacher/sections/{section:slug}/students`)

**View:** `layouts.teacher-layouts.contents.student-management.student.index-student-table`

Within a section, teachers manage enrolled students.

| Route                                      | Method | Purpose                          |
|--------------------------------------------|--------|----------------------------------|
| `GET /teacher/sections/{section}/students` | index  | List students in section         |
| `POST /teacher/sections/{section}/students` | store | Enroll a new student            |
| `GET /teacher/sections/{section}/students/{id}/edit` | edit | Edit modal data |
| `PUT /teacher/sections/{section}/students/{id}` | update | Update student record  |
| `DELETE /teacher/sections/{section}/students/{id}` | destroy | Remove student    |

AJAX:
- `GET /teacher/sections/{section}/students/list`

**Fields managed:**
- `school_id` — optional school identifier
- `rfid_serial_number` — unique RFID tag assigned to the student
- `batch`
- `last_name`, `first_name`, `middle_name`, `name_extension`
- `sex`
- `birth_date`
- `email` — used to create the student's login account
- `phone_number`
- `address`

**Student Account Creation:**
When a new student is created, a corresponding `User` account is also created with the `student` role. The default password is the student's birth date formatted as `mdY` (e.g., `01012010` for January 1, 2010).

**Ownership Enforcement:** The `ensure_teacher_section_ownership` middleware ensures a teacher can only access students within sections they own.

---

### 5. Class Schedule Management (`/teacher/sections/{section:slug}/class-schedules`)

**View:** `layouts.teacher-layouts.contents.class-schedule.index-class-schedule`

Teachers define class schedules for each section.

| Route                                                         | Method | Purpose                        |
|---------------------------------------------------------------|--------|--------------------------------|
| `GET /teacher/sections/{section}/class-schedules`             | index  | List class schedules           |
| `POST /teacher/sections/{section}/class-schedules`            | store  | Create new class schedule      |
| `GET /teacher/sections/{section}/class-schedules/{id}/edit`   | edit   | Edit modal data                |
| `PUT /teacher/sections/{section}/class-schedules/{id}`        | update | Update class schedule          |
| `DELETE /teacher/sections/{section}/class-schedules/{id}`     | destroy | Delete class schedule         |

AJAX:
- `GET /teacher/sections/class-schedules-list`
- `GET /teacher/sections/days-of-weeks-list`

**Fields managed:**
- `subject` — e.g., "Mathematics"
- `subject_code` — unique per teacher + section
- `start_time`, `end_time` — time strings (validated: start < end)
- `days_of_weeks` — array of day IDs (at least one required)

**Conflict Detection:**
When creating or updating a class schedule, the system checks for overlapping time slots on the same day within the same section or teacher. If an overlap is detected, the operation is rejected with a validation error.

---

### 6. Reports (`/teacher/reports`)

**View:** `layouts.teacher-layouts.contents.report.index-report`

Teachers can generate and download attendance reports.

| Route                                    | Method | Purpose                          |
|------------------------------------------|--------|----------------------------------|
| `GET /teacher/reports`                   | index  | Show report page                 |
| `POST /teacher/reports-to-generate`      | POST   | Prepare report data              |
| `GET /teacher/attendance-quarterly-report` | GET  | Generate and download PDF report |

AJAX:
- `GET /teacher/students/{section}` — student list by section
- `GET /teacher/quarters` — quarter list

The system uses `barryvdh/laravel-dompdf` to generate downloadable PDF reports.

---

### 7. Excuse Review (`/teacher/excuses`)

**View:** `layouts.teacher-layouts.contents.excuse.index-excuse-request`

Teachers review and act on student excuse requests.

| Route                                                         | Method | Purpose                          |
|---------------------------------------------------------------|--------|----------------------------------|
| `GET /teacher/excuses`                                        | index  | List pending excuse requests     |
| `GET /teacher/get-excuse-request-by-student-to-review`        | GET    | Fetch excuse request details     |
| `GET /teacher/get-excuse-request-message/{id}`                | GET    | Fetch excuse message             |
| `GET /teacher/get-excuse-request-class-schedule-attendance/{classScheduleId}/{studentId}` | GET | Fetch attendance context |
| `POST /teacher/mark-excuse-student-attendances/{attendanceId}` | POST | Approve excuse (mark attendance) |
| `POST /teacher/decline-excuse-request/{classScheduleId}`      | POST   | Decline excuse request           |
| `GET /teacher/count-pending-excuse-request`                   | GET    | Pending count for badge          |

**Actions:**
- **Approve** — marks the student's attendance for the relevant class schedule as `excuse` status.
- **Decline** — rejects the excuse request.

---

### 8. Student Location Tracking (`/teacher/student-locations`)

**View:** `layouts.teacher-layouts.contents.student-location.index-student-location`

Teachers can view student locations on a map overlay of the geofence boundary.

| Route                                    | Method | Purpose                          |
|------------------------------------------|--------|----------------------------------|
| `GET /teacher/student-locations`         | index  | Show location tracking page      |
| `GET /teacher/student/{student}/location` | GET   | Get specific student location    |
| `GET /teacher/student-locations/request` | GET    | Bulk location request            |
| `GET /teacher/geofence-boundaries/map`   | GET    | Geofence map data                |

AJAX:
- `GET /teacher/geofence-boundaries/map`
- `GET /teacher/student-locations/request`

The teacher can see whether students are inside, outside, or at the boundary edge of the school geofence.

---

## Implementation Notes

- **Role Enforcement:** The `role:teacher` middleware alias is registered in `bootstrap/app.php`.
- **Section Ownership:** The `ensure_teacher_section_ownership` middleware prevents teachers from accessing or modifying data for sections they do not own. This is critical for the student and class schedule nested routes.
- **RFID Attendance Time Logic:** Attendance status is determined by comparing the current time (Asia/Manila timezone) against the class schedule's `start_time` and `end_time`. A 15-minute grace period is applied for "present" status; anything after that is "late".
- **Day Validation:** Attendance is only accepted on days that match the class schedule's assigned `days_of_weeks`.
- **Duplicate Prevention:** The system checks if an attendance record already exists for the same RFID serial number, class schedule, and date to prevent duplicate entries.

---

## Data Model Relationships

```
User (teacher role)
  └── Teacher (1:1)
        ├── Section (1:many)
        │     ├── Student (1:many)
        │     │     └── User (student role, 1:1)
        │     └── ClassSchedule (1:many)
        │           ├── Attendance (1:many)
        │           └── DayOfWeek (many:many via class_schedule_days)
        ├── Attendance (1:many via class_schedule)
        ├── ExcuseRequest (reviewed by teacher)
        └── StudentLocation (viewed by teacher)
```
