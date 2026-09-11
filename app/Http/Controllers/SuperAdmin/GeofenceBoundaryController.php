<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\GeofenceBoundary;
use App\Models\GeofenceBoundaryStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class GeofenceBoundaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('layouts.superadmin-layouts.contents.geofence-boundary.index-geofence-boundary');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $superAdmin = $user->superAdmin;

        $enabledStatusId = GeofenceBoundaryStatus::where('status', 'enabled')->value('id');

        /* The page map only renders the enabled boundary, so a first
           boundary created as disabled is invisible until the user hunts
           it down in the table and enables it — a dead end right after
           "added successfully". The first boundary is therefore enabled
           straight away; later ones stay disabled, since only one
           boundary can be enabled at a time (enforced in update()). */
        $isEnabled = ! GeofenceBoundary::where('status_id', $enabledStatusId)->exists();

        $statusId = $isEnabled
            ? $enabledStatusId
            : GeofenceBoundaryStatus::where('status', 'disabled')->value('id');

        $validated = $request->validate([
            'school_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius' => 'required|numeric',
        ]);

        GeofenceBoundary::create(array_merge($validated, [
            'super_admin_id' => $superAdmin->id,
            'status_id' => $statusId,
        ]));

        return response()->json(['success' => true, 'enabled' => $isEnabled]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeofenceBoundary $geofenceBoundary)
    {
        $geofenceBoundary->load('geofenceBoundaryStatus');

        return response()->json($geofenceBoundary);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GeofenceBoundary $geofenceBoundary)
    {
        $enabledStatusId = GeofenceBoundaryStatus::where('status', 'enabled')->value('id');

        $validated = $request->validate([
            'school_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius' => 'required|numeric',
            'status_id' => [
                'required',
                'numeric',
                'exists:geofence_boundary_statuses,id',
                Rule::unique('geofence_boundaries', 'status_id')->where(function ($query) use ($geofenceBoundary, $enabledStatusId) {
                    $query->where('status_id', $enabledStatusId)
                        ->where('id', '!=', $geofenceBoundary->id);
                })->ignore($geofenceBoundary->id),
            ],
        ], [
            'status_id.unique' => 'Snap! One enabled geofence boundary exists, disable it first and enable only one.',
        ]);

        $geofenceBoundary->update($validated);

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeofenceBoundary $geofenceBoundary)
    {
        $geofenceBoundary->delete();

        return response()->json(['success' => true]);
    }
}
