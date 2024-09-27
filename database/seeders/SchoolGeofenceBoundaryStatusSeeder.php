<?php

namespace Database\Seeders;

use App\Models\SchoolGeofenceBoundaryStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolGeofenceBoundaryStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SchoolGeofenceBoundaryStatus::insert([
            [
                'status' => 'enabled',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'disabled',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
