<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\Quarter;
use Illuminate\Http\Request;

class QuarterRequest extends Controller
{
    public function getQuarters()
    {
        $quarters = Quarter::all();
        return response()->json([
            'quarters' => $quarters,
        ]);
    }
}
