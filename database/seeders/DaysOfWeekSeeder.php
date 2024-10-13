<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DaysOfWeekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed the table with days of the week
        DB::table('days_of_weeks')->insert([
            [
                'day_name' => 'Sunday',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'day_name' => 'Monday',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'day_name' => 'Tuesday',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'day_name' => 'Wednesday',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [   'day_name' => 'Thursday',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'day_name' => 'Friday',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [   'day_name' => 'Saturday',
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}
