<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\GeofenceBoundaryStatus;

class GeofenceBoundaryStatusRequest extends Controller
{
    public function getGeofenceBoundaryStatuses()
    {
        $status = GeofenceBoundaryStatus::all();
        return response()->json($status);
    }
}
