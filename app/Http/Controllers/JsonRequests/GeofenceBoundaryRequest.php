<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\GeofenceBoundary;
use Illuminate\Http\Request;

class GeofenceBoundaryRequest extends Controller
{
    public function getGeofenceBoundary()
    {
        $geofenceBoundary = GeofenceBoundary::with('geofenceBoundaryStatus')->get();
        return response()->json($geofenceBoundary);
    }
}
