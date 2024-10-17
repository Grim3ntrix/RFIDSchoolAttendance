<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('app:mark-absent-students')->everyThirtyMinutes();
Schedule::command('app:delete-storage-files')->everyFifteenMinutes();
Schedule::command('app:delete-student-locations')
    ->dailyAt('00:00')
    ->timezone('Asia/Manila');
