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
        Schema::create('excuse_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')
                  ->constrained('students')
                  ->onDelete('cascade');
            $table->foreignId('class_schedule_id')
                  ->constrained('class_schedules')
                  ->onDelete('cascade');
            $table->longText('excuse_message');
            $table->string('latitude');
            $table->string('longitude');
            $table->foreignId('status_id')
                  ->constrained('excuse_request_statuses')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('excuse_requests');
    }
};
