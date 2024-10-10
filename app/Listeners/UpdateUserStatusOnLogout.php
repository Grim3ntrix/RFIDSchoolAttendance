<?php

namespace App\Listeners;

use App\Events\UserLoggedOut;
use App\Models\UserStatus;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateUserStatusOnLogout
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserLoggedOut $event): void
    {
        $offlineStatus = UserStatus::where('status', 'offline')->first();

        if ($offlineStatus) {
            $event->user->status_id = $offlineStatus->id;
            $event->user->save();
        }
    }
}
