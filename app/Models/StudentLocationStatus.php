<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentLocationStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
    ];

    /* Relationship */

    public function studentLocation()
    {
        return $this->hasMany(StudentLocation::class, 'status_id');
    }
}
