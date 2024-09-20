<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserStatus;

class UserStatusController extends Controller
{
    public function __construct(
        private ?User $user = null
    ){
        $this->user = Auth::user();
    }

    public function updateStatusToOnline()
    {
        if ($this->user) {

            $onlineStatus = UserStatus::where('status', 'online')->first();

            if ($onlineStatus) {
                $this->user->status_id = $onlineStatus->id;
                $this->user->save();
            }
        }
    }

    public function updateStatusToOffline()
    {
        if ($this->user) {

            $offlineStatus = UserStatus::where('status', 'offline')->first();
            
            if ($offlineStatus) {
                $this->user->status_id = $offlineStatus->id;
                $this->user->save();
            }
        }
    }
}
