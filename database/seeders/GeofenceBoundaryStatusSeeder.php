<?php

namespace Database\Seeders;

use App\Models\GeofenceBoundaryStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeofenceBoundaryStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GeofenceBoundaryStatus::insert([
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
