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
            ['status' => 'present'],
            ['status' => 'late'],
            ['status' => 'absent'],
            ['status' => 'excuse'],
        ]);
    }
}
