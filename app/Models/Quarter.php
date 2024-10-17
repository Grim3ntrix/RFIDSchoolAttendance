<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quarter extends Model
{
    use HasFactory;

    protected $fillable = [
        'quarter_name'
    ];

    // public function reports()
    // {
    //     return $this->hasMany(Report::class, 'quarter_id');
    // }
}
