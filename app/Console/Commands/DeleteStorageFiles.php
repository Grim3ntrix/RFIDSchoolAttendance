<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeleteStorageFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-storage-files';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete all files from storage directory';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Specify the disk if you are using multiple disks, e.g., 'local', 's3', etc.
        $files = Storage::allFiles(); // This gets all files in the storage

        foreach ($files as $file) {
        Storage::delete($file); // Delete each file
        }

        $this->info('All files have been deleted from storage.');
    }
}
