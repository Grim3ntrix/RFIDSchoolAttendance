# RFID School Attendance - Release Notes

**Version:** v1.2.0

---

## **General (UI/UX)**

- All pages follow the Flowbite design system defined in `docs/design/FLOWBITE_UI_UX_GUIDELINES.md`.
- Dark mode is available via a header toggle; maps are theme-aware.
- The seeders create one test account per role (see README — Seeded Test Accounts) so every workflow can be exercised without manual setup.

---

## **Super Admin**

### **Overview - Dashboard Dynamics**
- Dynamic display of:
  - Total Pre-Registered
  - Total Registered
  - Total Teachers

### **Pre-Registration**
1. Required fields: First Name, Last Name, Gender, Phone Number, Address, Teacher ID
2. Teacher ID is used to create teacher accounts and ensure data privacy.

### **Geofence Boundary**
1. Required fields: Latitude, Longitude, Radius (Auto-filled if possible)
2. The first boundary created is automatically enabled; boundaries created afterwards default to disabled. Only one boundary can be enabled at a time.
3. Enabled geofences are used to determine if students are inside or outside the boundary.
4. Super Admin can interact with OpenStreetMap to display enabled geofences.
5. The boundary map editor supports:
   - Searching a location (suggestions include the postcode) and flying to it
   - Dragging the boundary marker and adjusting its radius
   - Locating the Super Admin's current position
   - Automatic school name and address autofill based on the boundary's placement
   - Dark mode

---

## **Teacher**

### **Overview - Dashboard Dynamics**
- Dynamic display of:
  - Total Students
  - Total Subjects
  - Total Sections
- Current Scheduled Classes for the day.
- Today's Attendance breakdown (Pie Chart).

### **Attendance - RFID**
1. Conditions:
    - Missing inputs: Section, Class Schedule, RFID Serial Number
    - Unregistered RFID Serial Number
    - Class not yet started
    - Class already ended
    - Attendance only valid on scheduled class days.
2. Attendance statuses:
    - **Present**: Students are marked present if they scan the RFID within 15 minutes of the class start time.
    - **Late**: Students are marked late if they scan the RFID after the 15-minute grace period.
    - **Absent**: Automatically marked absent if no RFID scan is recorded within the scheduled class time.
    - **Excused**: Excused attendance upon teacher approval of valid requests.
3. Attendance counter shows how many students have taken attendance.
4. All attendance records for the current day are displayed in a table.

### **Management**
- Teachers can only manage their assigned sections, students, and schedules.

#### **Section Management**
1. Conditions:
    - Required inputs: Section Name, Grade/Year Level.
    - Section names must be unique per teacher and grade/year.
2. Deleting a section will also delete related user accounts, class schedules, attendance records, and excuse requests.

#### **Student Management**
1. Register student RFID and create user accounts for excuse requests.
2. Conditions:
    - Required inputs: Name, Email, Birthdate, RFID Serial Number.
    - Email and birthdate (MMDDYYYY) are default login credentials.
3. Deleting a student also deletes their user account.

#### **Class Schedule Management**
1. Conditions:
    - Time range: 07:00 AM to 05:00 PM.
    - Required inputs: Subject, Subject Code, Start Time, End Time.
    - Time conflicts and overlaps are only allowed within the same teacher and section.
    - Start time must be earlier than end time.

### **Reports - Quarterly Attendance**
Generates quarterly attendance reports for each student in a section.
1. Steps:
    - Select Section
    - Select Student
    - Select Quarter
    - Choose Quarter Start and End Dates
    - Generate PDF

### **Location**
- Active while the student is online, limited to assigned sections.
- Student locations are refreshed or deleted daily at midnight.
- Students that are offline will make thier location "unavailable".

### **Excuse Management**
1. Teachers receive badge indicaor in the sidebar for pending excuse requests.
2. Pending requests are shown in a table.
3. Approve or decline excuse requests using modals.
4. Approved requests are marked excused; declined requests are removed from the list.

---

## **Student**

### **Overview - Dashboard Dynamics**
- Dynamic display of:
  - Total Present
  - Total Late
  - Total Absent
  - Total Excused

### **Excuse Request**
- Pending excuse requests are highlighted.
- Students can request excuses for assigned class schedules.
- New excuse requests include:
   - Auto-filled Section and Recipient fields
   - Selectable Class Schedule
   - Upload proof of excuse (e.g., document link)
   - Message to explain the excuse request

---

## **Version History**

| Version | Date | Notes |
|---------|------|-------|
| v1.2.0 | 2026-09-11 | Flowbite UI/UX modernization across all roles with dark mode; interactive geofence map editor with search and school name autofill; seeded test accounts for all roles. |
| v1.1.0 | 2026-09-07 | Upgraded to Laravel 13 (PHP 8.4); session/cache security hardening; fixed invalid auth redirects and test database isolation. |
| v1.0.0 (Stable Beta) | 2026-07-20 | Concluded stable beta phase; all core features verified. |
| v1.0.0-beta2 | 2024-10-24 | Dynamic focus on RFID input, version tracking improvements. |
| v1.0.0-beta | 2024-10-20 | Initial beta release with core attendance, geofence, and role-based features. |
