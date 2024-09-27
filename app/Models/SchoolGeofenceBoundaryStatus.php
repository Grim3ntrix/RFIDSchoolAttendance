<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolGeofenceBoundaryStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
    ];

    public function schoolGeofenceBoundary()
    {
        return $this->hasMany(SchoolGeofenceBoundary::class, 'status_id');
    }
}
