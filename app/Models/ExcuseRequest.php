<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExcuseRequest extends Model
{
    use HasFactory;

    /* Relationship */

    public function students()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function classSchedules()
    {
        return $this->belongsTo(ClassSchedule::class, 'class_schedule_id');
    }

    public function excuseRequestStatus()
    {
        return $this->belongsTo(ExcuseRequestStatus::class, 'status_id');
    }
}
