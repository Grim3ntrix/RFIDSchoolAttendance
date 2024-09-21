<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    /* Relationship */

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sections()
    {
        return $this->hasMany(Section::class, 'teacher_id');
    }

    public function classSchedules()
    {
        return $this->hasMany(ClassSchedule::class, 'teacher_id');
    }
}
