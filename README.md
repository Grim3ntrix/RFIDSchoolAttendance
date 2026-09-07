<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

# RFIDSchoolAttendance

RFIDSchoolAttendance is a comprehensive attendance system designed for schools. It uses RFID technology combined with geofencing and location-based tracking to monitor student attendance. The system allows teachers to capture attendance records automatically based on students' proximity to designated geofence boundaries set by the school administrator. Students' locations are tracked with their consent, and attendance is logged in real-time using a semi-geofencing approach. This project aims to streamline the attendance process, improve accuracy, and enhance overall school management.

**Current Version:** v1.0.0 (Stable Beta)

## Features

- **Role-Based Access Control** — Three roles: Super Admin, Teacher, and Student
- **RFID Attendance** — Scan RFID cards to mark attendance with automatic present/late classification
- **Geofence Boundaries** — Define school boundaries for location-based attendance tracking
- **Student Location Tracking** — Real-time location status (inside, outside, entered) via browser Geolocation API
- **Excuse Management** — Students submit excuse requests; teachers approve or decline
- **Reports** — Generate downloadable quarterly attendance PDF reports
- **Class Schedule Management** — Define subjects, time slots, and days of the week with conflict detection

## Prerequisites

- PHP >= 8.4
- Composer
- Laragon (recommended for local Windows development)
- MySQL (included with Laragon)
- Node.js & npm (for Vite frontend assets)

## Installation

1. **Clone or extract the project** into your Laragon `www` directory:

    ```bash
    C:\laragon\www\rfidschoolattendance
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

8. **Create the public storage symlink:**

    ```bash
    php artisan storage:link
    ```

    > **Why is this needed?**
    >
    > Generated quarterly attendance PDF reports are saved to `storage/app/public/`, but only files inside the `public/` directory are web-accessible. This command creates the `public/storage` symlink that bridges the two.
    >
    > The symlink is **not tracked by git**, so it must be created once per machine (and per deployment — on shared hosts that don't support symlinks, copy or bind the directory instead). If PDF downloads ever return a 404 even though the report was generated, a missing symlink is the first thing to check.

9. **Configure your domain in Laragon:**

    Add `rfidschoolattendance.test` (or your preferred domain) to your Laragon hosts and point it to the project directory.

10. **Start Laragon:**

    Open Laragon and start Apache/MySQL (or Nginx).

11. **Access the application:**

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
- [UI/UX Design System](./docs/design/FLOWBITE_UI_UX_GUIDELINES.md)

The design system guide is the authoritative reference for the application's visual language — brand colors, typography, spacing, Flowbite component usage, and UX patterns. It applies to all UI work, including AI-assisted development (see [CLAUDE.md](./CLAUDE.md)).

## Release Notes

For detailed version changes, refer to the [Release Notes](./RELEASE_NOTES.md).

## Changelog

For detailed changelog, see the [CHANGELOG.md](./CHANGELOG.md).
