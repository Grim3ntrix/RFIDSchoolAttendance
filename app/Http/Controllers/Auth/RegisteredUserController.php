<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'teacher_id' => ['required', 'string', 'exists:pre_registered_teachers,teacher_id', 'unique:' . User::class],
            'email'      => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password'   => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'teacher_id.exists' => 'The teacher ID is not valid. Please contact the school administrator.',
        ]);

        $user = User::create([
            'name'       => $request->name,
            'teacher_id' => $request->teacher_id,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
        ]);

        Teacher::create([
            'user_id' => $user->id,
        ]);

        $user->assignRole('teacher');

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('teacher_overview', absolute: false));
    }
}
