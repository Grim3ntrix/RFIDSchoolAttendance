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
            ['day_name' => 'Sunday'],
            ['day_name' => 'Monday'],
            ['day_name' => 'Tuesday'],
            ['day_name' => 'Wednesday'],
            ['day_name' => 'Thursday'],
            ['day_name' => 'Friday'],
            ['day_name' => 'Saturday'],

        ]);
    }
}
