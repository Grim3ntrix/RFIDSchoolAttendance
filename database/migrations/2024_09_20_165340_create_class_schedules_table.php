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
        Schema::create('class_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')
                  ->constrained('teachers')
                  ->onDelete('cascade');
            $table->foreignId('section_id')
                  ->constrained('sections')
                  ->onDelete('cascade');
            $table->string('subject');
            $table->string('subject_code');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();

            $table->unique(['subject', 'subject_code', 'start_time', 'end_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_schedules');
    }
};
