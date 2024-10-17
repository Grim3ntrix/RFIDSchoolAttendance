<?php

namespace App\Console\Commands;

use App\Models\StudentLocation;
use Illuminate\Console\Command;

class DeleteStudentLocations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-student-locations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete all captured locations of students';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $locations = StudentLocation::all();

        foreach ($locations as $location) {
            StudentLocation::find($location->id)
            ->delete(); // Delete each locations
        }

        $this->info('All captured locations have been deleted from student_locations database table.');
    }
}
