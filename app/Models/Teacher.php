<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'teacher_id',
        'last_name',
        'first_name',
        'middle_name',
        'name_extension',
        'sex',
        'birth_date',
        'phone_number',
        'address',
    ];

    /* Relationship */

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function section()
    {
        return $this->hasMany(Section::class, 'teacher_id');
    }

    public function classSchedule()
    {
        return $this->hasMany(ClassSchedule::class, 'teacher_id');
    }
}
