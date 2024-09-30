<?php

namespace Database\Seeders;

use App\Models\StudentLocationStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentLocationStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StudentLocationStatus::insert([
            [
                'status' => 'entered',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'exited',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'inside',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'outside',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'unknown',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
