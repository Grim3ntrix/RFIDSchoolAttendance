<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('layouts.teacher-layouts.contents.student-management.section.index-section');
    }

    public function getSectionRecords()
    {
        $user = Auth::user();
        $teacher = $user->teacher;
        $sectionRecords = Section::where('teacher_id', $teacher->id)->get();
        return response()->json($sectionRecords);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user    = Auth::user();
        $teacher = $user->teacher;

        $validated = $request->validate([
            'section_name'        => [
                'required',
                'string',
                'max:255',
                Rule::unique('sections')->where(function ($query) use ($teacher, $request) {
                    return $query->where('grade_or_year_level', $request->grade_or_year_level)
                                 ->where('teacher_id', $teacher->id);
                }),
            ],
            'grade_or_year_level' => 'required|string|max:255',
        ]);

        $sectionTable = new Section();
        $sectionTable->teacher_id = $teacher->id;
        $sectionTable->fill($validated);
        $sectionTable->save();

        return response()->json(['success' => true]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $sectionData = Section::findOrFail($id);
        return response()->json($sectionData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user    = Auth::user();
        $teacher = $user->teacher;

        $validated = $request->validate([
            'section_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sections')
                    ->where(function ($query) use ($teacher, $request) {
                    return $query->where('grade_or_year_level', $request->grade_or_year_level)
                                 ->where('teacher_id', $teacher->id);
                })->ignore($id), // Ignore the current record
            ],
            'grade_or_year_level' => 'required|string|max:255',
        ]);

        $section = Section::findOrFail($id);
        $section->fill($validated);
        $section->save(); // to trigger slug updating

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sectionData = Section::findOrFail($id);
        $sectionData->delete();

        return response()->json(['success' => true]);
    }
}
