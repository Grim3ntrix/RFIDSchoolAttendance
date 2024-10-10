<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ExcuseRequest;
use App\Models\ExcuseRequestStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExcuseController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('layouts.student-layouts.contents.excuse.index-excuse-request');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user    = Auth::user();
        $student = $user->student;

        $status = ExcuseRequestStatus::where('status', 'pending')->firstOrFail();

        $validated = $request->validate([
            'class_schedule'    => 'required|exists:class_schedules,id',
            'excuse_message'    => 'required|string',
            'proof_link'        => 'required|string|max:255',
        ]);

        ExcuseRequest::create([
            'student_id'          => $student->id,
            'class_schedule_id'   => $validated['class_schedule'],
            'excuse_message'      => $validated['excuse_message'],
            'proof'               => $validated['proof_link'],
            'status_id'           => $status->id,
        ]);

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $excuseRequest = ExcuseRequest::findOrFail($id);
        $excuseRequest->delete();

        return response()->json(['success' => true]);
    }
}
