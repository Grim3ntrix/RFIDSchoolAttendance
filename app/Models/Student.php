<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_id',
        'user_id',
        'school_id',
        'rfid_serial_number',
        'batch',
        'last_name',
        'first_name',
        'middle_name',
        'name_extension',
        'sex',
        'birth_date',
        'email',
        'phone_number',
        'address',
    ];

    /* Relationship */

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class, 'student_id');
    }

    public function excuseRequest()
    {
        return $this->hasMany(ExcuseRequest::class, 'student_id');
    }

    // public function report()
    // {
    //     return $this->hasMany(Report::class, 'student_id');
    // }

    public function studentLocation()
    {
        return $this->hasMany(StudentLocation::class, 'student_id');
    }
}
