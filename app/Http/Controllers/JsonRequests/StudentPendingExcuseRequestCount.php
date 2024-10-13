<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentPendingExcuseRequestCount extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function countPendingExcuseRequests()
    {
        $pendingExcuseRequests = $this->user->student->excuseRequest()
        ->whereHas('excuseRequestStatus', function ($q) {
                $q->where('status', 'pending');
        })
        ->count();
        
        
        return response()->json([
            'pendingExcuseRequestCount' => $pendingExcuseRequests,
        ]);
    }
}
