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
            // Validate input
            $validated = $request->validate([
                'subject' => [
                'required',
                'string',
                'max:255',
            ],
            'subject_code' => [
                'required',
                'string',
                'max:100',
                Rule::unique('class_schedules')
                    ->where(function ($query) use ($teacher, $section, $request) {
                        return $query->where('teacher_id', $teacher->id)
                                     ->where('section_id', $section->id)
                                     ->where('subject', $request->subject); // Check subject uniqueness only if subject_code is the same
                    }),
            ],
                'start_time' => 'required|string|before:end_time',
                'end_time'   => 'required|string|after:start_time',
                'days_of_weeks' => 'required|array',
                'days_of_weeks.*' => 'exists:days_of_weeks,id',
            ], [
                'subject.required' => 'The subject field is required.',
                'subject.unique'   => 'This subject has already been assigned for the same section and teacher during this time slot.',
                'subject_code.required' => 'The subject code field is required.',
                'subject_code.unique'   => 'This subject code has already been assigned for the same section and teacher during this time slot.',
                'start_time.required'   => 'The start time field is required.',
                'start_time.before'     => 'The start time must be earlier than the end time.',
                'end_time.required'     => 'The end time field is required.',
                'end_time.after'        => 'The end time must be later than the start time.',
                'days_of_weeks.required'=> 'You must select at least one day of the week.',
                'days_of_weeks.*.exists'=> 'The selected day of the week is invalid.',
            ]);

            // Convert the validated input
            $newStartTime = $request->start_time;
            $newEndTime   = $request->end_time;
            $selectedDays = $validated['days_of_weeks']; // Days of the week selected for the class

            // Check for overlapping schedules
            $overlapExists = DB::table('class_schedules')
                ->join('class_schedule_days', 'class_schedules.id', '=', 'class_schedule_days.class_schedule_id')
                ->whereIn('class_schedule_days.days_of_week_id', $selectedDays) // Check only within the same day(s)
                ->where(function ($query) use ($section, $teacher) {
                    $query->where('section_id', $section->id)
                        ->orWhere('teacher_id', $teacher->id); // Check for conflicts within the same section or teacher
                })
                ->where(function ($query) use ($newStartTime, $newEndTime) {
                    $query->where('start_time', '<', $newEndTime)
                        ->where('end_time', '>', $newStartTime); // Check if the time overlaps
                })
                ->exists();

            if ($overlapExists) {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'start_time' => 'The new class time overlaps with an existing schedule on the same day.',
                        'end_time'   => 'The new class time overlaps with an existing schedule on the same day.',
                    ]
                ], 422);
            }

            // Create class schedule and attach days of week
            $classSchedule = $section->classSchedule()->create(array_merge($validated, [
                'teacher_id' => $teacher->id,
                'section_id' => $section->id,
            ]));

            $classSchedule->daysOfWeek()->attach($validated['days_of_weeks']); // Attach days of the week to the class schedule

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
                ],
                'subject_code' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('class_schedules')
                        ->where(function ($query) use ($teacher, $section, $request) {
                            return $query->where('teacher_id', $teacher->id)
                                        ->where('section_id', $section->id)
                                        ->where('subject', $request->subject); // Uniqueness based on subject if subject_code exists
                        })
                        ->ignore($classSchedule->id),
                ],
                'start_time' => 'required|string|before:end_time',
                'end_time'   => 'required|string|after:start_time',
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
                'days_of_weeks.required' => 'You must select at least one day of the week.',
                'days_of_weeks.*.exists' => 'The selected day of the week is invalid.',
            ]);

            $newStartTime = $request->start_time;
            $newEndTime   = $request->end_time;
            $selectedDays = $validated['days_of_weeks'];

            // Check for overlapping schedules
            $existingClasses = DB::table('class_schedules')
                ->join('class_schedule_days', 'class_schedules.id', '=', 'class_schedule_days.class_schedule_id')
                ->whereIn('class_schedule_days.days_of_week_id', $selectedDays)
                ->where(function ($query) use ($section, $teacher) {
                    $query->where('section_id', $section->id)
                        ->orWhere('teacher_id', $teacher->id);
                })
                ->where(function ($query) use ($newStartTime, $newEndTime, $classSchedule) {
                    $query->where('start_time', '<', $newEndTime)
                        ->where('end_time', '>', $newStartTime)
                        ->where('class_schedules.id', '!=', $classSchedule->id); // Exclude current schedule
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

            // Sync days of the week
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
