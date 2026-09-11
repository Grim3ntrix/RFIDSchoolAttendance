<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Verifies the role test accounts the UserSeeder creates — each one must
 * not just exist but be a complete, working login (role assigned, related
 * record present), because a seeded account that 500s its own dashboard
 * is worse than no seeded account at all. Seeds the full DatabaseSeeder
 * chain, exactly what `migrate:fresh --seed` runs.
 */
class UserSeederTest extends TestCase
{
    use RefreshDatabase;

    protected $seeder = DatabaseSeeder::class;

    private function account(string $email): User
    {
        $user = User::where('email', $email)->first();

        $this->assertNotNull($user, "Seeded account {$email} is missing.");

        return $user;
    }

    public function test_superadmin_account_is_seeded(): void
    {
        $superadmin = $this->account('superadmin@gmail.com');

        $this->assertTrue($superadmin->hasRole('superadmin'));
        $this->assertNotNull($superadmin->superAdmin, 'Super Admin record is missing.');
        $this->assertTrue(Hash::check('SUpassword', $superadmin->password));
    }

    public function test_teacher_account_mirrors_the_registration_flow(): void
    {
        $teacher = $this->account('teacher@gmail.com');

        $this->assertTrue($teacher->hasRole('teacher'));
        $this->assertNotNull($teacher->teacher, 'Teacher record is missing.');
        $this->assertTrue(Hash::check('TEpassword', $teacher->password));

        // The teacher_id must exist in pre_registered_teachers, like every
        // teacher created through the real registration flow — otherwise
        // the Super Admin overview's registered-teacher count skews.
        $this->assertDatabaseHas('pre_registered_teachers', [
            'teacher_id' => $teacher->teacher->teacher_id,
        ]);
    }

    public function test_student_account_mirrors_the_enrollment_flow(): void
    {
        $student = $this->account('student@gmail.com');

        $this->assertTrue($student->hasRole('student'));

        // Without the Student record, every student page resolves
        // $user->student to null and fails.
        $this->assertNotNull($student->student, 'Student record is missing.');
        $this->assertNotNull($student->student->section, 'The seeded student is not enrolled in a section.');

        // Fixed testing password (the real enrollment flow uses the birth
        // date in mdY — the birth date below stays asserted so the docs'
        // mdY example stays truthful).
        $this->assertTrue(Hash::check('STpassword', $student->password));
        $this->assertSame('2010-01-01', $student->student->birth_date);
    }

    public function test_seeded_student_belongs_to_the_seeded_teacher(): void
    {
        $teacher = $this->account('teacher@gmail.com');
        $student = $this->account('student@gmail.com');

        $teacherSectionIds = $teacher->teacher->section()->pluck('id');
        $studentSectionId = $student->student->section_id;

        $this->assertTrue(
            $teacherSectionIds->contains($studentSectionId),
            'The seeded student must be enrolled in one of the seeded teacher\'s sections.'
        );
    }
}
