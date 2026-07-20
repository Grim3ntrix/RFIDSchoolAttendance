# RFIDSchoolAttendance

RFIDSchoolAttendance is a comprehensive attendance system designed for schools. It uses RFID technology combined with geofencing and location-based tracking to monitor student attendance. The system allows teachers to capture attendance records automatically based on students' proximity to designated geofence boundaries set by the school administrator. Students' locations are tracked with their consent, and attendance is logged in real-time using a semi-geofencing approach. This project aims to streamline the attendance process, improve accuracy, and enhance overall school management.

## Features

- **Role-Based Access Control** — Three roles: Super Admin, Teacher, and Student
- **RFID Attendance** — Scan RFID cards to mark attendance with automatic present/late classification
- **Geofence Boundaries** — Define school boundaries for location-based attendance tracking
- **Student Location Tracking** — Real-time location status (inside, outside, entered) via browser Geolocation API
- **Excuse Management** — Students submit excuse requests; teachers approve or decline
- **Reports** — Generate downloadable quarterly attendance PDF reports
- **Class Schedule Management** — Define subjects, time slots, and days of the week with conflict detection

## Prerequisites

- PHP >= 8.2
- Composer
- Laragon (recommended for local Windows development)
- MySQL (included with Laragon)
- Node.js & npm (for Vite frontend assets)

## Installation

1. **Clone or extract the project** into your Laragon `www` directory:

    ```bash
    C:\laragon\www\RFIDSchoolAttendance-1.0.0-beta3
    ```

2. **Install PHP dependencies:**

    ```bash
    composer install
    ```

3. **Install Node dependencies and build assets:**

    ```bash
    npm install
    npm run build
    ```

4. **Create the `.env` file:**

    Copy `.env.example` to `.env`:

    ```bash
    copy .env.example .env
    ```

5. **Generate the application key:**

    ```bash
    php artisan key:generate
    ```

6. **Configure the `.env` file for MySQL:**

    Update the database connection settings in `.env`:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=rfidschoolattendance
    DB_USERNAME=root
    DB_PASSWORD=
    ```

    Adjust `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` to match your Laragon MySQL configuration.

7. **Run migrations and seeders:**

    ```bash
    php artisan migrate --seed
    ```

8. **Configure your domain in Laragon:**

    Add `rfidschoolattendance.test` (or your preferred domain) to your Laragon hosts and point it to the project directory.

9. **Start Laragon:**

    Open Laragon and start Apache/MySQL (or Nginx).

10. **Access the application:**

    Navigate to `https://rfidschoolattendance.test` in your browser.

---

## First User

After running the seeders, the following default Super Admin account is created:

| Field    | Value                  |
|----------|------------------------|
| Email    | superadmin@gmail.com   |
| Password | Spassword              |

Use this account to log in and begin configuring the system.

---

## Enabling HTTPS SSL in Laragon

> **Why is this needed?**
>
> The browser Geolocation API — used for student location tracking and geofence boundary mapping — only works in **secure contexts** (HTTPS or `localhost`). If you access the application via plain HTTP (e.g., `http://rfidschoolattendance.test`), location features will fail.
>
> To fix this, enable SSL for your local domain in Laragon.

### Step 1: Open Laragon Settings

1. Open Laragon.
2. Click the **Menu** button (top-left).
3. Select **Settings** (or press `Ctrl + Alt + S`).

### Step 2: Enable SSL

1. In the Settings window, go to the **SSL** tab.
2. Check the box labeled **Enable SSL**.
3. Click **OK** to save.

### Step 3: Restart Laragon

1. Stop all services (click **Stop All**).
2. Start all services again (click **Start All**).

### Step 4: Verify HTTPS Access

1. Open your browser and navigate to:

    ```
    https://rfidschoolattendance.test
    ```

2. You should see a padlock icon in the address bar. Laragon uses a self-signed certificate, so your browser may show a warning on first visit. Click **Advanced** and proceed to the site (this is normal for local development).

### Troubleshooting

- **Certificate error persists:** Clear your browser cache or restart the browser. On Windows, you may also import the Laragon CA certificate into your system/browser trust store.
- **Mixed content warnings:** Ensure all asset URLs in your `.env` use `https://`:
    ```
    APP_URL=https://rfidschoolattendance.test
    ```
- **Geolocation still fails:** Make sure you are accessing the site via `https://` and not `http://`. Also confirm that the geofence boundary is enabled in the Super Admin panel.

---

## Documentation

For detailed role-based workflows and implementation details, see:

- [Super Admin Workflow](./docs/superadmin-workflow.md)
- [Teacher Workflow](./docs/teacher-workflow.md)
- [Student Workflow](./docs/student-workflow.md)

## Release Notes

For detailed version changes, refer to the [Release Notes](./RELEASE_NOTES.md).

## Changelog

For detailed changelog, see the [CHANGELOG.md](./CHANGELOG.md).
