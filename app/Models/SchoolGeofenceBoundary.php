<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolGeofenceBoundary extends Model
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

    public function schoolGeofenceBoundaryStatus()
    {
        return $this->belongsTo(SchoolGeofenceBoundaryStatus::class, 'status_id');
    }
}
