<?php

namespace Database\Seeders;

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
        // User::factory(10)->create();

        $teacher = User::factory()->create([
            'name' => 'Teacher',
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        $teacher->assignRole('teacher');

        $student = User::factory()->create([
            'name' => 'Student',
            'email' => 'student@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        $student->assignRole('student');

        $superadmin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        $superadmin->assignRole('superadmin');
    }
}
