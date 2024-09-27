<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('school_geofence_boundaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('super_admin_id')
                  ->constrained('super_admins')
                  ->onDelete('cascade');
            $table->string('school_name');
            $table->string('address');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->decimal('radius', 10, 2);
            $table->foreignId('status_id')
                  ->constrained('school_geofence_boundary_statuses')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_geofence_boundaries');
    }
};
