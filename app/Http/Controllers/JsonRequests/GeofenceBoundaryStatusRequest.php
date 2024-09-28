<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\GeofenceBoundaryStatus;
use Illuminate\Http\Request;

class GeofenceBoundaryStatusRequest extends Controller
{
    public function getGeofenceBoundaryStatuses()
    {
        $status = GeofenceBoundaryStatus::get();
        return response()->json($status);
    }
}
