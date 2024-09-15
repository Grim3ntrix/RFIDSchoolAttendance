<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $teacherRole = Role::create(['name' => 'teacher']);
        $studentRole = Role::create(['name' => 'student']);
        $superAdminRole = Role::create(['name' => 'superadmin']);

        // Optionally, create permissions and assign to roles
        // $viewGrades = Permission::create(['name' => 'view grades']);
        // $teacherRole->givePermissionTo($viewGrades);
    }
}
