# Changelog

## [v1.1.0] - 2026-09-07
### Changed
- Upgraded the framework from Laravel 11.22 to 13.30.1 following the official 12.x and 13.x upgrade guides.
- Raised the runtime requirement to PHP 8.4 (Symfony 8.1 requires >= 8.4.1).
- Applied Laravel 13 security hardening: JSON session serialization (invalidates active sessions once on deploy) and cache `serializable_classes` hardening.
- Bumped `spatie/laravel-permission` to ^6.21, `barryvdh/laravel-dompdf` to ^3.1, `laravel/tinker` to ^3.0, and PHPUnit to ^12.0.
- Bumped the application version to `1.1.0` across `.env.example` and `.env`.

### Fixed
- Fixed email verification and password confirmation redirects that referenced an unregistered `overview` route (500 errors in production).
- Pointed the test suite at a dedicated `rfidschoolattendance_testing` database instead of the development database.
- Grouped the eight lookup seeders into `ReferenceDataSeeder` and seeded them during database refresh so user creation no longer violates the `users.status_id` foreign key.
- Resolved all npm security advisories.

### Added
- Documented the `php artisan storage:link` setup step and the PHP 8.4 requirement in the README.
- Added the Flowbite UI/UX design system guide (`docs/design/FLOWBITE_UI_UX_GUIDELINES.md`).

## [Stable Beta] - 2026-07-20
### Added
- Concluded stable beta phase; all core features verified and documented.
- Updated documentation across CHANGELOG, RELEASE_NOTES, and README to reflect stable beta completion.

### Changed
- Bumped application version to `1.0.0` across `.env.example` and `config/app.php`.
- Synchronized release notes with changelog entries (beta, beta2, and stable beta).

### Fixed
- Resolved inconsistencies between CHANGELOG.md and RELEASE_NOTES.md.

## [v1.0.0-beta2] - 2024-10-24
### Added
- Added version number to the `.env` file for better version tracking.
- Created a key in `config/app.php` to retrieve the application version dynamically.

### Changed
- Updated `rfid-attendance.js` to focus on input fields upon loading, enhancing user experience.

### Fixed
- Fixed the version retrieval in the `footer.blade.php` file to ensure it displays correctly.

## [v1.0.0-beta] - 2024-10-20
### Added
- Middleware to ensure teachers can only access their own sections.
- Dynamic display of registered users, students, and teachers.
- Enhanced geofencing features for location tracking.
- Ability for teachers to manage students, sections, and class schedules.

### Fixed
- Adjusted the student request recipient name to display the corresponding teacher.

### Changed
- Added the version number to the footer.
