<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    /* Relationship */

    public function teachers()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'section_id');
    }

    public function classSchedules()
    {
        return $this->hasMany(ClassSchedule::class, 'section_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'section_id');
    }
}
