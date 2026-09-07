# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

RFIDSchoolAttendance — a school attendance system using RFID taps, geofencing,
and per-quarter PDF reports. Laravel Blade monolith (server-rendered), no API/SPA
split. Planned future migration to Livewire or Inertia is explicitly out of scope
until the current UI/UX redesign pass is done.

## Stack

- **Backend:** Laravel 13, PHP 8.4, Eloquent, Blade
- **Frontend:** Vite, Tailwind CSS, Flowbite (component library — keep using it),
  Alpine.js; Leaflet (maps), FullCalendar, DataTables, SweetAlert2, ApexCharts
- **Auth/roles:** Breeze + spatie/laravel-permission — roles: `teacher`,
  `student`, `superadmin`
- **Database:** MySQL 8 (Laragon). PDF via barryvdh/laravel-dompdf
- **Dev environment:** Windows, Laragon (Apache). No Docker.

## Commands

`php` is not on the system PATH. Use the full binary in every shell command:

```
export PATH="/c/laragon/bin/php/php-8.4.2-Win32-vs17-x64:$PATH"
```

Composer is invoked as `php /c/laragon/bin/composer/composer.phar`.

- Tests: `php artisan test` (in a shell where the PATH export has been done;
  in the user's Laragon terminal it works directly)
- Lint: `php vendor/bin/pint --test <files>` (whole project has pre-existing failures — scope to changed files)
- Frontend: `npm run dev` / `npm run build` (Node 22 via Laragon)
- Fresh dev DB: `php artisan migrate:fresh --seed`

## Database rules — critical

- **MySQL only. Never introduce SQLite anywhere**, including throwaway debug
  scripts. The local MySQL has no pdo_sqlite drivers assumed and the user has
  explicitly rejected it.
- Tests run against a dedicated `rfidschoolattendance_testing` database (set in
  `phpunit.xml`). Do not point tests at the dev database — a test run performs
  `migrate:fresh` and wipes it.
- `users.status_id` defaults to `1` and is a FK to `user_statuses` — any
  environment needs the lookup seeders before creating users.
  `ReferenceDataSeeder` groups all eight lookup seeders; `tests/TestCase.php`
  seeds it automatically via the `$seeder` property.

## Application conventions

- Route names are role-prefixed: `teacher_overview`, `student_overview`,
  `superadmin_overview`. There is no `dashboard` or `overview` route — the two
  controllers that referenced them were 500s and have been fixed; don't
  reintroduce those names.
- Teacher registration requires the `teacher_id` to exist in
  `pre_registered_teachers` (all columns are non-nullable).
- Seeded logins: `superadmin@gmail.com` / `Spassword` (teacher/student blocks
  in `UserSeeder` are commented out).
- Page JS lives in per-feature files under `resources/js/` — keep JS modular
  per role/feature rather than one bundle.
- Pint has never been run on the legacy codebase; only fix style on files
  actually being touched.

## UI/UX design system

- `docs/design/FLOWBITE_UI_UX_GUIDELINES.md` is authoritative for visual
  language, Flowbite component usage, color, spacing, accessibility, and UX
  patterns — read it before substantial UI work.
- Green is the primary brand direction on a neutral/slate foundation. Semantic
  colors keep their meaning: amber = late, red = absent/danger, blue = info.
  Never saturate the interface in green.
- Prefer Flowbite components and established project patterns over custom
  one-offs; no arbitrary hex values, spacing, or typography.
- UI work preserves existing functionality — routes, permissions, validation,
  and business logic stay untouched during visual passes.
- The flowbite MCP server (`.mcp.json`) provides `generate-theme`; use it when
  establishing or revising the theme, not for individual pages.

## Git conventions

- Conventional Commits (`type(scope): short description` + bulleted body).
- **Never commit or push. The user reviews and commits manually.** Suggest the
  message; stop there. No `Co-Authored-By` trailers.
- Branches: `main` is the target; feature branches like `upgrade/laravel-13`.
  Some stale role branches (`frontend`, `backend`, `release-*`) exist.

## Environment quirks

- `public/storage` is a symlink to `storage/app/public/` (created by
  `php artisan storage:link`) — it is not tracked by git and must be created
  per machine/deployment. If PDF downloads 404, this is the first thing to
  check. App is served via `http://rfidschoolattendance.test/` (Laragon
  auto-vhost) or `http://localhost/RFIDSchoolAttendance/public/` —
  `http://localhost/` itself is the Laragon welcome page, not this app.

- Laragon's terminal PATH can go stale after a PHP version switch — if
  `php artisan` reports the wrong PHP version, check
  `C:\laragon\bin\laragon\laragon.cmd`.
- Session serialization is `json` (Laravel 13 hardening) — deploying logs all
  users out once.
