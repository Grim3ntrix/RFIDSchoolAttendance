<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Geofence extends Model
{
    use HasFactory;

    /* Relationship */

    public function students()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function geofenceStatus()
    {
        return $this->belongsTo(GeofenceStatus::class, 'status_id');
    }
}
