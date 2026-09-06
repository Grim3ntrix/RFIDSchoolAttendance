<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ReferenceDataSeeder extends Seeder
{
    /**
     * Seed the lookup tables the application schema depends on.
     *
     * These rows are referenced by foreign keys and column defaults (for
     * example `users.status_id` defaults to 1), so every environment needs
     * them before any domain record can be created.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserStatusSeeder::class,
            DaysOfWeekSeeder::class,
            AttendanceStatusSeeder::class,
            GeofenceBoundaryStatusSeeder::class,
            StudentLocationStatusSeeder::class,
            ExcuseRequestStatusSeeder::class,
            QuarterSeeder::class,
        ]);
    }
}
