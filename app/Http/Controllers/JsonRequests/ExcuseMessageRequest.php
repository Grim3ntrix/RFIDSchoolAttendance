<?php

namespace App\Http\Controllers\JsonRequests;

use App\Http\Controllers\Controller;
use App\Models\ExcuseRequest;
use Illuminate\Http\Request;

class ExcuseMessageRequest extends Controller
{
    public function getExcuseMessageRequest($id)
    {
        $excuseMessage = ExcuseRequest::where('id', $id)->first();
        return response()->json($excuseMessage);
    }
}
