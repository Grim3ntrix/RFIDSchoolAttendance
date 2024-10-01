<?php

namespace Database\Seeders;

use App\Models\AttendanceStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttendanceStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AttendanceStatus::insert([
            [
                'status' => 'present',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'late',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'absent',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'excuse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
