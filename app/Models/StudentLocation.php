<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentLocation extends Model
{
    use HasFactory;

    /* Relationship */

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function studentLocationStatus()
    {
        return $this->belongsTo(StudentLocationStatus::class, 'status_id');
    }
}
