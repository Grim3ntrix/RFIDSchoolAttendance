<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $sectionRecords = Section::all();
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
        $validated = $request->validate([
            'section_name'        => 'required|string|max:255|unique:sections,section_name,' . $request->id,
            'grade_or_year_level' => 'required|string|max:255|unique:sections,grade_or_year_level,' . $request->id,
        ]);

        $user    = Auth::user();
        $teacher = $user->teacher;

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
        $validated = $request->validate([
            'section_name'        => 'required|string|max:255|unique:sections,section_name,' . $id,
            'grade_or_year_level' => 'required|string|max:255|unique:sections,grade_or_year_level,' . $id,
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
