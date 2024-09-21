<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExcuseRequestStatus extends Model
{
    use HasFactory;

    public function excuseRequest()
    {
        return $this->hasMany(ExcuseRequest::class, 'status_id');
    }
}
