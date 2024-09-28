<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeofenceBoundary extends Model
{
    use HasFactory;

    protected $fillable = [
        'super_admin_id',
        'school_name',
        'address',
        'latitude',
        'longitude',
        'radius',
        'super_admin_id',
        'status_id',
    ];

    public function geofenceBoundaryStatus()
    {
        return $this->belongsTo(GeofenceBoundaryStatus::class, 'status_id');
    }
}
