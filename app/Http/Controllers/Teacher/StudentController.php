<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Student;
use App\Models\User;
use App\Models\UserStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    public function index(Section $section)
    {
        return view('layouts.teacher-layouts.contents.student-management.student.index-student-table', compact('section'));
    }

    public function store(Request $request, Section $section)
    {
        $validated = $request->validate([
            'school_id'          => 'nullable|string|max:255',
            'rfid_serial_number' => 'required|string|max:50|unique:students,rfid_serial_number,' . $request->id,
            'batch'              => 'required|string|max:255',
            'last_name'          => 'required|string|max:255',
            'first_name'         => 'required|string|max:255',
            'middle_name'        => 'nullable|string|max:255',
            'name_extension'     => 'nullable|string|max:255',
            'sex'                => 'required|string|max:255',
            'birth_date'         => 'required',
            'email'              => 'required|string|max:255|unique:users,email,' . $request->id,
            'phone_number'       => 'nullable|string|max:255',
            'address'            => 'nullable|string|max:255',
        ]);

        $birthDatePass = null;
        if ($request->birth_date) {
            $birthDate = \DateTime::createFromFormat('Y-m-d', $request->birth_date);
            
            if ($birthDate) {
                $birthDatePass = $birthDate->format('mdY'); 
            }
        }

        $studentUser = $this->createStudentUser($request, $birthDatePass);

        $studentUser->assignRole('student');

        $section->student()->create(array_merge($validated, [
            'user_id'    => $studentUser->id,
            'section_id' => $section->id,
        ]));

        return response()->json(['success' => true]);
    }

    private function createStudentUser(Request $request, $birthDatePass)
    {
        $offlineStatus = UserStatus::where('status', 'offline')->first();

        $user = User::create([
            'name'       => $request->first_name . ' ' . $request->middle_name . ' ' . $request->last_name . ' ' . ($request->name_extension ?? ''),
            'email'      => $request->email,
            'password'   => Hash::make($birthDatePass),
            'status_id'  => $offlineStatus->id,
        ]);

        return $user;
    }

    public function edit(Section $section, Student $student)
    {
        $studentData = $section->student()
        ->where('id', $student->id)
        ->first();

        return response()->json($studentData);
    }

    public function update(Request $request, Section $section, Student $student)
    {
        $validated = $request->validate([
            'school_id'          => 'nullable|string|max:255',
            'rfid_serial_number' => [
                'required',
                'string',
                'max:50',
                Rule::unique('students', 'rfid_serial_number')->ignore($student->id),
            ],
            'batch'              => 'required|string|max:255',
            'last_name'          => 'required|string|max:255',
            'first_name'         => 'required|string|max:255',
            'middle_name'        => 'nullable|string|max:255',
            'name_extension'     => 'nullable|string|max:255',
            'sex'                => 'required|string|max:255',
            'phone_number'       => 'nullable|string|max:255',
            'address'            => 'nullable|string|max:255',
        ]);

        $student->update($validated);

        return response()->json(['success' => true]);
    }

    public function destroy(Section $section, Student $student)
    {
        $student->delete();
        return response()->json(['success' => true]);
    }
    
}
