<?php

namespace Database\Seeders;

use App\Models\Quarter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuarterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quarter::insert([
            [
                'quarter_name' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quarter_name' => '2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quarter_name' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'quarter_name' => '4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
