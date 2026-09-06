<?php

namespace Tests\Feature\Auth;

use App\Models\PreRegisteredTeacher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $teacher = PreRegisteredTeacher::create([
            'teacher_id' => 'TCH-0001',
            'last_name' => 'Doe',
            'first_name' => 'Jane',
            'middle_name' => 'A',
            'sex' => 'female',
            'email' => 'test@example.com',
            'phone_number' => '09123456789',
            'address' => 'Sample Address',
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'teacher_id' => $teacher->teacher_id,
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('teacher_overview', absolute: false));
    }
}
