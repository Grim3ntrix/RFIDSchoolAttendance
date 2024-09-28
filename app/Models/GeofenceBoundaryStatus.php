<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeofenceBoundaryStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
    ];

    public function geofenceBoundary()
    {
        return $this->hasMany(GeofenceBoundary::class, 'status_id');
    }
}
