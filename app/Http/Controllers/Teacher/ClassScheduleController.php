<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\ClassSchedule;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ClassScheduleController extends Controller
{
    public function index(Section $section)
    {
        return view('layouts.teacher-layouts.contents.class-schedule.index-class-schedule', compact('section'));
    }

    public function store(Request $request, Section $section)
    {
        $user    = Auth::user();
        $teacher = $user->teacher;

        $validated = $request->validate([
            'subject' => [
                'required',
                'string',
                'max:255',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($teacher, $request) {
                        return $query->where('teacher_id', $teacher->id)
                                    ->where('subject', $request->subject)
                                    ->where('subject_code', $request->subject_code)
                                    ->where('start_time', $request->start_time)
                                    ->where('end_time', $request->end_time);
                    }),
            ],
            'subject_code'  => [
                'required',
                'string',
                'max:100',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($section, $request) {
                        return $query->where('section_id', $section->id)
                                    ->where('subject', $request->subject)
                                    ->where('subject_code', $request->subject_code)
                                    ->where('start_time', $request->start_time)
                                    ->where('end_time', $request->end_time);
                    }),
            ],
            'start_time'  => [
                'required',
                'string',
                'max:100',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($request, $section, $teacher) {
                        return $query
                                    ->where('section_id', $section->id)
                                    ->orWhere(function ($query) use ($request, $teacher) {
                                        return $query->where('teacher_id', $teacher->id)
                                                     ->where('start_time', '<=', $request->end_time)
                                                     ->where('end_time', '>=', $request->start_time);
                                    });
                    }),
            ],
            'end_time'  => [
                'required',
                'string',
                'max:100',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($request, $section, $teacher) {
                        return $query->where('section_id', $section->id)
                                    ->orWhere(function ($query) use ($request, $teacher) {
                                        return $query->where('teacher_id', $teacher->id)
                                                    ->where('start_time', '<=', $request->end_time)
                                                     ->where('end_time', '>=', $request->start_time);
                                    });
                    }),
            ],
            'days_of_weeks' => 'required|array',
            'days_of_weeks.*' => 'exists:days_of_weeks,id',
        ]);

       $classSchedule = $section->classSchedule()->create(array_merge($validated, [
            'teacher_id' => $teacher->id,
            'section_id' => $section->id,
        ]));

        $classSchedule->daysOfWeek()->attach($validated['days_of_weeks']); 

        return response()->json(['success' => true]);
    }

    public function show(Section $section)
    {
        return redirect()->route('sections.class-schedules.index', $section->slug);
    }

    public function edit(Section $section, ClassSchedule $classSchedule)
    {
        $classScheduleData = $section->classSchedule()
        ->where('id', $classSchedule->id)
        ->with('daysOfWeek')
        ->first();

        return response()->json($classScheduleData);
    }

    public function update(Request $request, Section $section, ClassSchedule $classSchedule)
    {
        $user    = Auth::user();
        $teacher = $user->teacher;

        $validated = $request->validate([
            'subject' => [
                'required',
                'string',
                'max:255',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($teacher, $request) {
                        return $query->where('teacher_id', $teacher->id)
                                    ->where('subject', $request->subject)
                                    ->where('subject_code', $request->subject_code)
                                    ->where('start_time', $request->start_time)
                                    ->where('end_time', $request->end_time);
                    })
                    ->ignore($classSchedule->id),
            ],
            'subject_code'  => [
                'required',
                'string',
                'max:100',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($section, $request) {
                        return $query->where('section_id', $section->id)
                                    ->where('subject', $request->subject)
                                    ->where('subject_code', $request->subject_code)
                                    ->where('start_time', $request->start_time)
                                    ->where('end_time', $request->end_time);
                    })
                    ->ignore($classSchedule->id),
            ],
            'start_time'  => [
                'required',
                'string',
                'max:100',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($section, $request) {
                        return $query->where('section_id', $section->id)
                                    ->orWhere(function ($query) use ($request) {
                                        return $query->where('start_time', '<=', $request->end_time)
                                                     ->where('end_time', '>=', $request->start_time);
                                    });
                    })
                    ->ignore($classSchedule->id),
            ],
            'end_time'  => [
                'required',
                'string',
                'max:100',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($section, $request) {
                        return $query->where('section_id', $section->id)
                                    ->orWhere(function ($query) use ($request) {
                                        return $query->where('start_time', '<=', $request->end_time)
                                                     ->where('end_time', '>=', $request->start_time);
                                    });
                    })
                    ->ignore($classSchedule->id),
            ],
            'days_of_weeks' => 'required|array',
            'days_of_weeks.*' => 'exists:days_of_weeks,id',
        ]);
    
        $classSchedule->update($validated);
    
        $classSchedule->daysOfWeek()->sync($request->days_of_weeks);
    
        return response()->json(['success' => true]);
    }

    public function destroy(Section $section, ClassSchedule $classSchedule)
    {
        $classSchedule->delete();
        return response()->json(['success' => true]);
    }
}
