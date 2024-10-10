<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\ClassSchedule;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        try {
            $validated = $request->validate([
                'subject' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('class_schedules')
                        ->where(function ($query) use ($teacher, $section, $request) {
                            return $query->where('teacher_id', $teacher->id)
                                        ->where('section_id', $section->id)
                                        ->where('subject', $request->subject);
                        }),
                ],
                'subject_code' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('class_schedules')
                        ->where(function ($query) use ($teacher, $section, $request) {
                            return $query->where('teacher_id', $teacher->id)
                                        ->where('section_id', $section->id)
                                        ->where('subject_code', $request->subject_code);
                        }),
                ],
                'start_time' => 'required|string|before:end_time',
                'end_time'   => [
                'required',
                'string',
                'max:100',
                'after:start_time',
                    // Rule::unique('class_schedules')
                    //     ->where(function ($query) use ($section, $request) {
                    //         return $query->where('section_id', $section->id)
                    //                     ->orWhere(function ($query) use ($request) {
                    //                         return $query->where('end_time', '>', $request->start_time);
                    //                     });
                    //     })
                ],
                'days_of_weeks'   => 'required|array',
                'days_of_weeks.*' => 'exists:days_of_weeks,id',
            ], [
                'subject.required'          => 'The subject field is required.',
                'subject.unique'            => 'This subject has already been assigned for the same section and teacher during this time slot.',
                'subject_code.required'     => 'The subject code field is required.',
                'subject_code.unique'       => 'This subject code has already been assigned for the same section and teacher during this time slot.',
                'start_time.required'       => 'The start time field is required.',
                'start_time.before'         => 'The start time must be earlier than the end time.',
                'end_time.required'         => 'The end time field is required.',
                'end_time.after'            => 'The end time must be later than the start time.',
                'end_time.unique'           => 'The new class time overlaps with an existing schedule.',
                'days_of_weeks.required'    => 'You must select at least one day of the week.',
                'days_of_weeks.*.exists'    => 'The selected day of the week is invalid.',
            ]);

            $newStartTime = $request->start_time;
            $newEndTime   = $request->end_time;

            $existingClasses = DB::table('class_schedules')
                ->where(function ($query) use ($section, $teacher) {
                    $query->where('section_id', $section->id)
                        ->orWhere('teacher_id', $teacher->id);
                })
                ->where(function ($query) use ($newStartTime, $newEndTime) {
                    $query->where('start_time', '<', $newEndTime)
                        ->where('end_time', '>', $newStartTime);
                })
                ->exists();

            if ($existingClasses) {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'start_time' => 'The new class time overlaps with an existing schedule.',
                        'end_time'   => 'The new class time overlaps with an existing schedule.',
                    ]
                ], 422);
            }

            $classSchedule = $section->classSchedule()->create(array_merge($validated, [
                'teacher_id' => $teacher->id,
                'section_id' => $section->id,
            ]));

            # Attach the id in pivot table
            $classSchedule->daysOfWeek()->attach($validated['days_of_weeks']); 

            return response()->json(['success' => true, 'message' => 'Class schedule created successfully!']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->validator->errors(),
            ], 422);
        }
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
        $user = Auth::user();
        $teacher = $user->teacher;

        try {
            $validated = $request->validate([
                'subject' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('class_schedules')
                        ->where(function ($query) use ($teacher, $section, $request) {
                            return $query->where('teacher_id', $teacher->id)
                                        ->where('section_id', $section->id)
                                        ->where('subject', $request->subject);
                        })
                        ->ignore($classSchedule->id),
                ],
                'subject_code' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('class_schedules')
                        ->where(function ($query) use ($teacher, $section, $request) {
                            return $query->where('teacher_id', $teacher->id)
                                        ->where('section_id', $section->id)
                                        ->where('subject_code', $request->subject_code);
                        })
                        ->ignore($classSchedule->id),
                ],
                'start_time' => 'required|string|before:end_time',
                'end_time'   => [
                'required',
                'string',
                'max:100',
                'after:start_time',
                    // Rule::unique('class_schedules')
                    //     ->where(function ($query) use ($section, $request) {
                    //         return $query->where('section_id', $section->id)
                    //                     ->orWhere(function ($query) use ($request) {
                    //                         return $query->where('end_time', '>', $request->start_time);
                    //                     });
                    //     })
                        // ->ignore($classSchedule->id),
                ],
                'days_of_weeks'     => 'required|array',
                'days_of_weeks.*'   => 'exists:days_of_weeks,id',
            ], [
                'subject.required'       => 'The subject field is required.',
                'subject.unique'         => 'This subject has already been assigned for the same section and teacher during this time slot.',
                'subject_code.required'  => 'The subject code field is required.',
                'subject_code.unique'    => 'This subject code has already been assigned for the same section and teacher during this time slot.',
                'start_time.required'    => 'The start time field is required.',
                'start_time.before'      => 'The start time must be earlier than the end time.',
                'end_time.required'      => 'The end time field is required.',
                'end_time.after'         => 'The end time must be later than the start time.',
                'end_time.unique'        => 'The new class time overlaps with an existing schedule.',
                'days_of_weeks.required' => 'You must select at least one day of the week.',
                'days_of_weeks.*.exists' => 'The selected day of the week is invalid.',
            ]);

            $newStartTime = $request->start_time;
            $newEndTime   = $request->end_time;

            $existingClasses = DB::table('class_schedules')
                ->where(function ($query) use ($section, $teacher) {
                    $query->where('section_id', $section->id)
                        ->orWhere('teacher_id', $teacher->id);
                })
                ->where(function ($query) use ($newStartTime, $newEndTime, $classSchedule) {
                    $query->where('start_time', '<', $newEndTime)
                        ->where('end_time', '>', $newStartTime)
                        ->where('id', '!=', $classSchedule->id); // Exclude current schedule
                })
                ->exists();

            if ($existingClasses) {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'start_time' => 'The new class time overlaps with an existing schedule.',
                        'end_time'   => 'The new class time overlaps with an existing schedule.',
                    ]
                ], 422);
            }

            // Update class schedule
            $classSchedule->update(array_merge($validated, [
                'teacher_id' => $teacher->id,
                'section_id' => $section->id,
            ]));

            # Sync days of the week
            $classSchedule->daysOfWeek()->sync($validated['days_of_weeks']);

            return response()->json(['success' => true, 'message' => 'Class schedule updated successfully!']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->validator->errors(),
            ], 422);
        }
    }

    public function destroy(Section $section, ClassSchedule $classSchedule)
    {
        $classSchedule->delete();
        return response()->json(['success' => true]);
    }
}
