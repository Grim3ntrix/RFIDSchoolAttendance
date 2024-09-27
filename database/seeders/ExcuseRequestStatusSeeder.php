<?php

namespace Database\Seeders;

use App\Models\ExcuseRequestStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExcuseRequestStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExcuseRequestStatus::insert([
            [
                'status' => 'approved',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'rejected',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
