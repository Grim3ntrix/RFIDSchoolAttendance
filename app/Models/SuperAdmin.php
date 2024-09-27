<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuperAdmin extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'last_name',
        'first_name',
        'middle_name',
        'name_extension',
        'sex',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
