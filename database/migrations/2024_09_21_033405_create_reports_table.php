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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')
                  ->constrained('sections')
                  ->onDelete('cascade');
            $table->foreignId('student_id')
                  ->constrained('students')
                  ->onDelete('cascade');
            $table->foreignId('class_schedule_id')
                  ->constrained('class_schedules')
                  ->onDelete('cascade');
            $table->foreignId('quarter_id')
                  ->constrained('quarters')
                  ->onDelete('cascade');
            $table->decimal('attendance_percentage');
            $table->integer('total_classes');
            $table->integer('attended_classes');
            $table->integer('absent_classes');
            $table->integer('late_classes');
            $table->integer('excuse_classes');
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
