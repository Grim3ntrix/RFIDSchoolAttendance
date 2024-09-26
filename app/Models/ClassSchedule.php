<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'section_id',
        'subject',
        'subject_code',
        'start_time',
        'end_time',
    ];

    /* Relationship */

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function section()
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

    public function report()
    {
        return $this->hasMany(Report::class, 'class_schedule_id');
    }

    public function daysOfWeek()
    {
        return $this->belongsToMany(DaysOfWeek::class, 'class_schedule_days', 'class_schedule_id', 'days_of_week_id')
                    ->withTimestamps();
    }
}
