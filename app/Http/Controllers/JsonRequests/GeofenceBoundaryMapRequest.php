<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\GeofenceBoundary;
use App\Models\GeofenceBoundaryStatus;
use Illuminate\Http\Request;

class GeofenceBoundaryMapRequest extends Controller
{
    public function getGeofenceBoundaryMap()
    {
        $status = GeofenceBoundaryStatus::where('status', 'enabled')->first();

        $enabledGeofenceBoundary = GeofenceBoundary::with('geofenceBoundaryStatus')
                                ->where('status_id', $status->id)
                                ->first();
        return response()->json($enabledGeofenceBoundary);
    }
}
