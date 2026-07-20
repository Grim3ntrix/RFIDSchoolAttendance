# Changelog

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
