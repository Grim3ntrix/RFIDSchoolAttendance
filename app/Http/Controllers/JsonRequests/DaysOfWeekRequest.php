<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\DaysOfWeek;
use App\Models\Section;

class DaysOfWeekRequest extends Controller
{
    public function getDaysOfWeeks(Section $section)
    {
        $daysOfWeeks = DaysOfWeek::all();
        return response()->json($daysOfWeeks);
    }
}
