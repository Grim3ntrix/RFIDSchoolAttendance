<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeofenceStatus extends Model
{
    use HasFactory;

    /* Relationship */

    public function geofence()
    {
        return $this->hasMany(Geofence::class, 'status_id');
    }
}
