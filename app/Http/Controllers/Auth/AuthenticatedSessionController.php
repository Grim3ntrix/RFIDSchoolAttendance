<?php

namespace App\Http\Controllers\Auth;

use App\Events\UserLoggedIn;
use App\Events\UserLoggedOut;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        /**
         * @var \App\Models\User|null $user
        */

        $user = Auth::user();

        if ($user) {
            # Dispatch UserLoggedIn event
            event(new UserLoggedIn($user));
        }

        if ($user->hasRole('superadmin')){
            return redirect()->intended(route('superadmin_overview'));
        } elseif ($user->hasRole('teacher')){
            return redirect()->intended(route('teacher_overview'));
        } elseif ($user->hasRole('student')){
            return redirect()->intended(route('student_overview'));
        } else {
            return redirect(route('login'));
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        /**
         * @var \App\Models\User|null $user
        */
        
        $user = Auth::user();

        if ($user) {
            # Dispatch UserLoggedOut event
            event(new UserLoggedOut($user));
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
