<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentLocationStatus extends Model
{
    use HasFactory;

    /* Relationship */

    public function geofence()
    {
        return $this->hasMany(StudentLocation::class, 'status_id');
    }
}
