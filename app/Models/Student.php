<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    /* Relationship */

    public function sections()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function users()
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

    public function reports()
    {
        return $this->hasMany(Report::class, 'student_id');
    }

    public function geofence()
    {
        return $this->hasMany(Geofence::class, 'student_id');
    }
}
