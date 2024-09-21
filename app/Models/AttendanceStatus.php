<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceStatus extends Model
{
    use HasFactory;

    /* Relationship */

    public function attendance()
    {
        return $this->hasMany(Attendance::class, 'status_id');
    }
}
