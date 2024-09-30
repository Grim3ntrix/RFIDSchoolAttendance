<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Controllers\JsonRequests\GeofenceBoundaryMapRequest;
use App\Models\StudentLocation;
use App\Models\StudentLocationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchPositionController extends Controller
{
    protected $geofenceBoundaryMapRequest;

    public function __construct(GeofenceBoundaryMapRequest $geofenceBoundaryMapRequest)
    {
        $this->geofenceBoundaryMapRequest = $geofenceBoundaryMapRequest;
    }

    public function store(Request $request)
    {
        $user    = Auth::user();
        $student = $user->student;

        $validated = $request->validate([
            'latitude'    => 'required|numeric',
            'longitude'   => 'required|numeric',
        ]);

        $enabledBoundary = $this->geofenceBoundaryMapRequest->getEnabledGeofenceBoundary();

        if ($enabledBoundary) {
            $studentDistance = $this->calculateDistance(
                $validated['latitude'],
                $validated['longitude'],
                $enabledBoundary->latitude,
                $enabledBoundary->longitude
            );

            $radius = $enabledBoundary->radius;
            $status = null;

            if ($studentDistance < $radius) {
                $status = StudentLocationStatus::where('status', 'inside')->first();
            } elseif ($studentDistance == $radius) {
                $status = StudentLocationStatus::where('status', 'entered')->first();
            } else {
                $status = StudentLocationStatus::where('status', 'outside')->first();
            }

            // Save the student location and status
            if ($status) {
                StudentLocation::create(array_merge($validated, [
                    'student_id'  => $student->id,
                    'status_id'   => $status->id,
                ]));
            }
        } else {
            return response()->json(['error' => 'No enabled geofence boundary found'], 404);
        }
    }

    private function calculateDistance($studentLatitude, $studentLongitude, $boundaryLatitude, $boundaryLongitude) {
        $earthRadius = 6371000;
        
        $lat1 = deg2rad($studentLatitude);
        $lon1 = deg2rad($studentLongitude);
        $lat2 = deg2rad($boundaryLatitude);
        $lon2 = deg2rad($boundaryLongitude);
        
        $latDifference = $lat2 - $lat1;
        $lonDifference = $lon2 - $lon1;
        
        $a = sin($latDifference / 2) * sin($latDifference / 2) +
            cos($lat1) * cos($lat2) * sin($lonDifference / 2) * sin($lonDifference / 2);
        
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        
        return $earthRadius * $c; // Distance in meters
    }
}
