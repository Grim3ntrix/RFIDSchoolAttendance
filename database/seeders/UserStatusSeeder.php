<?php

namespace Database\Seeders;

use App\Models\UserStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserStatus::insert([
            [
                'status' => 'online',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'offline',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
