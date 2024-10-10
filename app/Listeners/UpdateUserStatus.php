<?php

namespace App\Listeners;

use App\Events\UserLoggedIn;
use App\Models\UserStatus;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateUserStatus
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
    public function handle(UserLoggedIn $event): void
    {
        $onlineStatus = UserStatus::where('status', 'online')->first();

        if ($onlineStatus) {
            $event->user->status_id = $onlineStatus->id;
            $event->user->save();
        }
    }
}
