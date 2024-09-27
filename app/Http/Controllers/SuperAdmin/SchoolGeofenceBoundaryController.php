<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\SchoolGeofenceBoundary;
use App\Models\SchoolGeofenceBoundaryStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SchoolGeofenceBoundaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('layouts.superadmin-layouts.contents.school-geofence-boundary.index-school-geofence-boundary');
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
        $user       = Auth::user();
        $superAdmin = $user->superAdmin;

        $status = SchoolGeofenceBoundaryStatus::where('status', 'disabled')->firstOrFail();

        $validated = $request->validate([
            'school_name' => 'required|string|max:255',
            'address'     => 'required|string|max:255',
            'latitude'    => 'required|numeric',
            'longitude'   => 'required|numeric',
            'radius'      => 'required|numeric',
        ]);

        SchoolGeofenceBoundary::create(array_merge($validated, [
            'super_admin_id'  => $superAdmin->id,
            'status_id'       => $status->id,
        ]));

        return response()->json(['success' => true]);
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
