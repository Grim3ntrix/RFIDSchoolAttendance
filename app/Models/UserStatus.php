<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
    ];

    /* Relationship */

    public function user()
    {
        return $this->hasMany(User::class, 'status_id');
    }
}
