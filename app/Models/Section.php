<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'section_name',
        'grade_or_year_level',
    ];

    /* Relationship */

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function student()
    {
        return $this->hasMany(Student::class, 'section_id');
    }

    public function classSchedule()
    {
        return $this->hasMany(ClassSchedule::class, 'section_id');
    }

    public function report()
    {
        return $this->hasMany(Report::class, 'section_id');
    }
}
