<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserStatus;

class UserStatusController extends Controller
{
    public function updateStatusToOnline(User $user)
    {
        $onlineStatus = UserStatus::where('status', 'online')->first();

        if ($onlineStatus) {
            $user->status_id = $onlineStatus->id;
            $user->save();
        }
    }

    public function updateStatusToOffline(User $user)
    {
        $offlineStatus = UserStatus::where('status', 'offline')->first();

        if ($offlineStatus) {
            $user->status_id = $offlineStatus->id;
            $user->save();
        }
    }
}
