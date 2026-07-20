# Superadmin Workflow

## First User

The first user in the system is the **Super Admin**. This account is pre-seeded via `database/seeders/UserSeeder.php` and is assigned the `superadmin` role using Spatie Permission.

| Field    | Value                  |
|----------|------------------------|
| Email    | superadmin@gmail.com   |
| Password | Spassword              |
| Role     | superadmin             |

Run the seeders after setting up the database:

```bash
php artisan migrate --seed
```

The Super Admin is the only user who can create and manage geofence boundaries. Only one geofence boundary can be enabled at a time.

---

## Routes & Middleware

All Super Admin routes are prefixed with `/superadmin` and protected by:

- `auth` — must be logged in
- `verified` — email must be verified
- `role:superadmin` — must have the `superadmin` role

See `routes/web.php` lines 57–78.

---

## Pages & Features

### 1. Overview (`/superadmin/overview`)

**View:** `layouts.superadmin-layouts.contents.overview`

Displays three summary cards:

- **Total Pre-Registered** — count of teachers in the pre-registration queue
- **Total Registered** — count of fully registered teachers
- **Total Teachers** — total active teachers

Data is fetched via AJAX:
- `GET /superadmin/total-pre-registered`
- `GET /superadmin/total-registered`
- `GET /superadmin/total-teachers`

---

### 2. Pre-Registered Teachers (`/superadmin/pre-registered-teachers`)

**View:** `layouts.superadmin-layouts.contents.teacher.index-teacher`

Allows the Super Admin to manage teachers that have been pre-registered before they can fully access the system.

| Action   | Route                               | Controller Method                        |
|----------|-------------------------------------|------------------------------------------|
| Index    | `GET /superadmin/pre-registered-teachers` | `PreRegisteredTeacherController::index`  |
| Store    | `POST /superadmin/pre-registered-teachers` | `PreRegisteredTeacherController::store` |
| Edit     | `GET /superadmin/pre-registered-teachers/{id}/edit` | `PreRegisteredTeacherController::edit` |
| Update   | `PUT/PATCH /superadmin/pre-registered-teachers/{id}` | `PreRegisteredTeacherController::update` |
| Destroy  | `DELETE /superadmin/pre-registered-teachers/{id}` | `PreRegisteredTeacherController::destroy` |

**Fields managed:**
- `teacher_id` — unique identifier for the teacher
- `last_name`, `first_name`, `middle_name`, `name_extension`
- `sex` — `male` or `female`
- `birth_date`
- `email` — must be unique
- `phone_number`
- `address`

JSON records are fetched via:
- `GET /superadmin/pre-registered-teachers/records`

---

### 3. Geofence Boundaries (`/superadmin/geofence-boundaries`)

**View:** `layouts.superadmin-layouts.contents.geofence-boundary.index-geofence-boundary`

The Super Admin defines the school's geofence boundary. This boundary is used to determine whether a student is inside, outside, or at the edge of the school premises.

| Action   | Route                                     | Controller Method                            |
|----------|-------------------------------------------|----------------------------------------------|
| Index    | `GET /superadmin/geofence-boundaries`     | `GeofenceBoundaryController::index`          |
| Store    | `POST /superadmin/geofence-boundaries`    | `GeofenceBoundaryController::store`          |
| Edit     | `GET /superadmin/geofence-boundaries/{id}/edit` | `GeofenceBoundaryController::edit`     |
| Update   | `PUT/PATCH /superadmin/geofence-boundaries/{id}` | `GeofenceBoundaryController::update` |
| Destroy  | `DELETE /superadmin/geofence-boundaries/{id}` | `GeofenceBoundaryController::destroy` |

**Fields managed:**
- `school_name`
- `address`
- `latitude` — decimal degrees
- `longitude` — decimal degrees
- `radius` — meters
- `status_id` — references `geofence_boundary_statuses`

**Business Rule — Only One Enabled Boundary:**
Only one geofence boundary can be enabled at a time. When updating a boundary, the system enforces uniqueness on the `enabled` status. If you try to enable a second boundary while one is already enabled, validation will fail with:

> "Snap! One enabled geofence boundary exists, disable it first and enable only one."

**Statuses:**
- `enabled` — active geofence used for student location tracking
- `disabled` — inactive boundary

**Map Integration:**
The boundary is visualized on a map. The map data is fetched via:
- `GET /superadmin/geofence-boundaries/map`
- `GET /superadmin/geofence-boundaries/statuses`
- `GET /superadmin/geofence-boundaries/records`

---

## Implementation Notes

- **Role Enforcement:** The `role:superadmin` middleware alias is registered in `bootstrap/app.php` and resolves to `Spatie\Permission\Middleware\RoleMiddleware`.
- **Geofence Status Logic:** When storing a new boundary, the status is automatically set to `disabled`. When updating, the Super Admin can toggle the status. The `update` method uses `Rule::unique` to ensure no two boundaries share the `enabled` status simultaneously.
- **Location Calculation:** Student distance from the boundary center is calculated using the Haversine formula (`WatchPositionController::calculateDistance`), which returns distance in meters.
- **Secure Context Requirement:** Because the student location tracking uses the browser Geolocation API, the application must be served over HTTPS when deployed. See the README guide on enabling HTTPS SSL in Laragon.

---

## Data Model Relationships

```
User (superadmin role)
  └── SuperAdmin (1:1)
        └── GeofenceBoundary (1:many)
              └── GeofenceBoundaryStatus (belongs-to)
```
