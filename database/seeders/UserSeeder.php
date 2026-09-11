<?php

namespace Database\Seeders;

use App\Models\PreRegisteredTeacher;
use App\Models\Section;
use App\Models\SuperAdmin;
use App\Models\Teacher;
use App\Models\User;
use App\Models\UserStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed one login per role so every workflow can be exercised after a
     * single `php artisan migrate:fresh --seed`.
     *
     * Each account mirrors the flow that creates it in production, so
     * testing against a seeded account behaves like the real thing:
     *
     *   superadmin — the bootstrap account, seeded directly
     *   teacher    — pre-registered by the Super Admin, then registered,
     *                so the Super Admin overview's registered-teacher
     *                count stays consistent
     *   student    — enrolled by the seeded teacher into a seeded section,
     *                with a fixed testing password (the real enrollment
     *                flow uses the student's birth date formatted as mdY —
     *                see docs/student-workflow.md)
     */
    public function run(): void
    {
        /* Super Admin */

        $superadmin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('SUpassword'),
            'status_id' => 2,
        ]);

        $superadmin->assignRole('superadmin');

        SuperAdmin::create(['user_id' => $superadmin->id]);

        /* Teacher */

        PreRegisteredTeacher::create([
            'teacher_id' => 'T-2026-0001',
            'last_name' => 'Dela Cruz',
            'first_name' => 'Juan',
            'middle_name' => '',
            'sex' => 'Male',
            'phone_number' => '09171234567',
            'address' => '123 Sample Street, Sample City',
        ]);

        $teacher = User::factory()->create([
            'name' => 'Teacher',
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('TEpassword'),
            'status_id' => 1,
        ]);

        $teacher->assignRole('teacher');

        $teacherRecord = Teacher::create([
            'user_id' => $teacher->id,
            'teacher_id' => 'T-2026-0001',
        ]);

        /* Student */

        $section = Section::create([
            'teacher_id' => $teacherRecord->id,
            'section_name' => 'Rizal',
            'grade_or_year_level' => 'Grade 10',
        ]);

        $student = User::factory()->create([
            'name' => 'Maria Santos',
            'email' => 'student@gmail.com',
            // Fixed testing password — short and easy to type. The real
            // enrollment flow uses the student's birth date formatted as
            // mdY (e.g. 01012010). See docs/student-workflow.md.
            'password' => Hash::make('STpassword'),
            'status_id' => UserStatus::where('status', 'offline')->value('id'),
        ]);

        $student->assignRole('student');

        $section->student()->create([
            'user_id' => $student->id,
            'section_id' => $section->id,
            'rfid_serial_number' => 'RFID-0001',
            'batch' => '2026-2027',
            'last_name' => 'Santos',
            'first_name' => 'Maria',
            'sex' => 'Female',
            'birth_date' => '2010-01-01',
            'email' => 'student@gmail.com',
        ]);
    }
}
