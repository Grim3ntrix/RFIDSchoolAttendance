<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserStatusSeeder::class,
            UserSeeder::class,
            DaysOfWeekSeeder::class,
            AttendanceStatusSeeder::class,
            GeofenceBoundaryStatusSeeder::class,
            StudentLocationStatusSeeder::class,
            ExcuseRequestStatusSeeder::class,
            QuarterSeeder::class,
        ]);
    }
}
