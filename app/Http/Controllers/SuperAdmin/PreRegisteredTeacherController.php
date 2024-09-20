<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\SuperAdmin\PreRegisteredTeacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PreRegisteredTeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('layouts.superadmin-layouts.contents.teacher.index-teacher');
    }

    public function getTeacherRecords()
    {
        $teacherRecords = PreRegisteredTeacher::all();
        return response()->json($teacherRecords);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'teacher_id'        => 'required|string|max:255',
            'last_name'         => 'required|string|max:255',
            'first_name'        => 'required|string|max:255',
            'middle_name'       => 'required|string|max:255',
            'name_extension'    => 'nullable|string|max:50',
            'sex'               => 'required|string|in:male,female',
            'birth_date'        => 'nullable|date',
            'email'             => 'nullable|email|max:255|unique:teachers,email'. $request->id, // Add to be unique
            'phone_number'      => 'required|string|max:15',
            'address'           => 'required|string|max:255',
        ]);

        $teacherTable = new PreRegisteredTeacher();
        $teacherTable->fill($validated);
        $teacherTable->save();

        return response()->json(['success' => true]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $teacherData = PreRegisteredTeacher::findOrFail($id);
        return response()->json($teacherData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'teacher_id'        => 'required|string|max:255',
            'last_name'         => 'required|string|max:255',
            'first_name'        => 'required|string|max:255',
            'middle_name'       => 'required|string|max:255',
            'name_extension'    => 'nullable|string|max:50',
            'sex'               => 'required|string|in:male,female',
            'birth_date'        => 'nullable|date',
            'email'             => 'nullable|email|max:255|unique:teachers,email,' . $id,
            'phone_number'      => 'required|string|max:15',
            'address'           => 'required|string|max:255',
        ]);

        PreRegisteredTeacher::where('id', $id)->update($validated);

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $teacherData = PreRegisteredTeacher::findOrFail($id);
        $teacherData->delete();

        return response()->json(['success' => true]);
    }
}
