<?php

namespace App\Http\Middleware;

use App\Models\Section;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EnsureTeacherSectionOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next)
    {
        $section = $request->route('section');
        $user    = $request->user();
        $teacher = $user->teacher;

        // Log::info('section', [$section]);

        # Check if the authenticated teacher owns this section
        if ($section->teacher_id !== $teacher->id) {
            abort(403, 'Unauthorized access to this section\'s class schedules or students.');
        }

        return $next($request);
    }
}
