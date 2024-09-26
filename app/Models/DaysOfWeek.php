<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaysOfWeek extends Model
{
    use HasFactory;

    protected $fillable = [
        'day_name',
    ];

    public function classSchedule()
    {
        return $this->belongsToMany(ClassSchedule::class, 'class_schedule_days', 'days_of_week_id', 'class_schedule_id')
                    ->withTimestamps();
    }
}
