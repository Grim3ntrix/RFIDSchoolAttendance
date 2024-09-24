<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'section_name',
        'grade_or_year_level',
        'slug',
    ];

    public function getRouteKeyName()
    {
        return 'slug'; // Use 'slug' for route model binding
    }

    /**
     * Boot the model and add slug generation.
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($section) {
            $section->slug = static::generateSlug($section->section_name, $section->grade_or_year_level);
        });

        static::updating(function ($section) {
            $section->slug = static::generateSlug($section->section_name, $section->grade_or_year_level);
        });
    }

    /**
     * Generate a unique slug based on section_name and grade_or_year_level.
     */
    public static function generateSlug($sectionName, $gradeOrYearLevel)
    {
        $slug = Str::slug("{$sectionName} {$gradeOrYearLevel}");

        $count = static::where('slug', $slug)->count();
        if ($count > 0) {
            // Append a unique identifier if the slug already exists
            $slug .= '-' . ($count + 1);
        }

        return $slug;
    }

    /* Relationship */

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function student()
    {
        return $this->hasMany(Student::class, 'section_id');
    }

    public function classSchedule()
    {
        return $this->hasMany(ClassSchedule::class, 'section_id');
    }

    public function report()
    {
        return $this->hasMany(Report::class, 'section_id');
    }
}
