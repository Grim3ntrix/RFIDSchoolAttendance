# Student Workflow

## Role Overview

Students are the end-users whose attendance and location are tracked. Student accounts are created by teachers when enrolling them into a section. The system automatically creates a `User` account with the `student` role.

The default password is the student's birth date formatted as `mdY` (e.g., `01012010` for January 1, 2010).

---

## Routes & Middleware

All Student routes are prefixed with `/student` and protected by:

- `auth` — must be logged in
- `verified` — email must be verified
- `role:student` — must have the `student` role

See `routes/web.php` lines 168–194.

---

## Pages & Features

### 1. Overview (`/student/overview`)

**View:** `layouts.student-layouts.contents.overview`

Displays the student's attendance dashboard.

- **My Section** — the section name the student belongs to
- **Class Schedule Selector** — dropdown to select a class schedule
- **Date Range** — start and end date inputs to filter attendance data
- **Total Present** — count of present attendance records for the selected range
- **Total Late** — count of late attendance records
- **Total Absent** — count of absent attendance records
- **Total Excuse** — count of excuse-approved attendance records
- **Student Watch Position** — shows the student's current location tracking status

AJAX endpoints:
- `GET /student/class-schedule-select-for-overview` — fetch class schedules for dropdown
- `GET /student/get-attendance-status-totals-by-student-overview` — fetch attendance counts for the selected schedule and date range

**Note:** Data is only populated after the student selects a class schedule and defines a date range.

---

### 2. Excuse Requests (`/student/excuses`)

**View:** `layouts.student-layouts.contents.excuse.index-excuse-request`

Students can submit excuse requests for absences or late attendance.

| Route                                  | Method | Purpose                          |
|----------------------------------------|--------|----------------------------------|
| `GET /student/excuses`                 | index  | List student's excuse requests   |
| `POST /student/excuses`                | store  | Submit a new excuse request      |
| `DELETE /student/excuses/{id}`         | destroy | Delete an excuse request        |

AJAX:
- `GET /student/get-class-schedule-by-student` — fetch class schedules for the student
- `GET /student/get-excuse-request-by-student` — fetch the student's excuse history
- `GET /student/get-excuse-request-message/{id}` — fetch excuse message details
- `GET /student/count-pending-excuse-request` — pending count for badge notification

**Fields for new excuse request:**
- `class_schedule` — the class schedule the excuse is for
- `excuse_message` — explanation for the absence/late
- `proof_link` — URL to supporting evidence

**Statuses:**
- `pending` — awaiting teacher review
- `approved` / `declined` — set by the teacher

---

### 3. Watch Position (Location Tracking) (`POST /student/student-locations`)

**Controller:** `Student\WatchPositionController::store`

Students do not have a dedicated page for location tracking. Instead, the system expects the student's device to periodically send location updates to the backend.

**How it works:**

1. The student's browser (or a companion app) captures GPS coordinates using the Geolocation API.
2. A `POST` request is sent to `/student/student-locations` with `latitude` and `longitude`.
3. The backend calculates the distance from the student to the enabled geofence boundary center using the Haversine formula.
4. The location status is determined:
   - **inside** — distance < radius
   - **entered** — distance == radius
   - **outside** — distance > radius
5. A `StudentLocation` record is saved with the calculated status.

**AJAX:**
- `GET /student/student-locations` is not a route; location updates are `POST` only.

**Important — Secure Context Requirement:**

The browser Geolocation API only works in **secure contexts** (HTTPS or `localhost`). If the application is accessed via plain HTTP (e.g., `http://rfidschoolattendance.test`), location tracking will fail.

When using Laragon with a custom domain, you **must enable HTTPS SSL** for geofence features to work. See the README setup guide for instructions on enabling SSL in Laragon.

---

## Implementation Notes

- **Role Enforcement:** The `role:student` middleware alias is registered in `bootstrap/app.php`.
- **Geofence Dependency:** Location tracking depends on an enabled `GeofenceBoundary` record. If no boundary is enabled, the `store` method returns a 404 error with `No enabled geofence boundary found`.
- **Distance Calculation:** The Haversine formula is used to calculate the great-circle distance between two points on a sphere (Earth), returning meters. This determines whether the student is inside or outside the geofence.
- **Consent:** Location tracking is based on the student's consent through the browser's Geolocation API prompt.

---

## Data Model Relationships

```
User (student role)
  └── Student (1:1)
        ├── Attendance (1:many)
        ├── ExcuseRequest (1:many)
        └── StudentLocation (1:many)
              └── StudentLocationStatus (belongs-to)

GeofenceBoundary (enabled)
  ├── GeofenceBoundaryStatus (belongs-to)
  └── used by StudentLocation via distance calculation
```
