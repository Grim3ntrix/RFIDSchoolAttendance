<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassSchedule extends Model
{
    use HasFactory;

    /* Relationship */

    public function teachers()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function sections()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class, 'class_schedule_id');
    }

    public function excuseRequest()
    {
        return $this->hasMany(ExcuseRequest::class, 'class_schedule_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'class_schedule_id');
    }
}
