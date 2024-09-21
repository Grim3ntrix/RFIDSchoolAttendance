<?php

namespace Database\Seeders;

use App\Models\GeofenceStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeofenceStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GeofenceStatus::insert([
            ['status' => 'entered'],
            ['status' => 'exited'],
        ]);
    }
}
