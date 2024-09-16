<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (Auth::check()) {
            $user = Auth::user();
    
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

        return $next($request);
    }
}
