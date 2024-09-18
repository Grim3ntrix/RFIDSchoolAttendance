<?php

namespace App\Models\SuperAdmin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'last_name',
        'first_name',
        'middle_name',
        'name_extension',
        'sex',
        'birth_date',
        'email',
        'phone_number',
        'address',
    ];
}
