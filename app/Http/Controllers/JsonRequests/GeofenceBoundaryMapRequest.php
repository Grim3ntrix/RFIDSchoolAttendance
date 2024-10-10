<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\GeofenceBoundary;
use App\Models\GeofenceBoundaryStatus;

class GeofenceBoundaryMapRequest extends Controller
{
    public function getGeofenceBoundaryMap()
    {
        return response()->json($this->getEnabledGeofenceBoundary());
    }

    public function getEnabledGeofenceBoundary()
    {
        $status = GeofenceBoundaryStatus::where('status', 'enabled')->first();

        return GeofenceBoundary::with('geofenceBoundaryStatus')
        ->where('status_id', $status->id)
        ->first();
    }
}
