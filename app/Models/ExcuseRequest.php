<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExcuseRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'class_schedule_id',
        'excuse_message',
        'proof',
        'status_id',
    ];

    /* Relationship */

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function classSchedule()
    {
        return $this->belongsTo(ClassSchedule::class, 'class_schedule_id');
    }

    public function excuseRequestStatus()
    {
        return $this->belongsTo(ExcuseRequestStatus::class, 'status_id');
    }
}
