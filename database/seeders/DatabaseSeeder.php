<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\SuperAdmin;
use App\Models\Teacher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /* Super Admin Seeder */

        $superadmin = User::factory()->create([
            'name'      => 'Super Admin',
            'email'     => 'superadmin@gmail.com',
            'password'  => Hash::make('12345678'),
            'status_id'  => 1,
        ]);

        $superadmin->assignRole('superadmin');

        SuperAdmin::create(['user_id' => $superadmin->id]);

        /* Teacher Seeder */

        $teacher = User::factory()->create([
            'name'      => 'Teacher',
            'email'     => 'teacher@gmail.com',
            'password'  => Hash::make('12345678'),
            'status_id'  => 1,
        ]);

        $teacher->assignRole('teacher');

        Teacher::create([
            'user_id' => $teacher->id,
            'teacher_id' => 0,
        ]);

        /* Student Seeder */

        $student = User::factory()->create([
            'name'      => 'Student',
            'email'     => 'student@gmail.com',
            'password'  => Hash::make('12345678'),
            'status_id' => 1,
        ]);

        $student->assignRole('student');

    }
}
