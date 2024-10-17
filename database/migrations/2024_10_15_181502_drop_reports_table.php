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
        // Drop the reports table if it exists
        Schema::dropIfExists('reports');

        // Modify the middle_name column to be nullable in the pre_registered_teachers table
        Schema::table('pre_registered_teachers', function (Blueprint $table) {
            $table->string('middle_name')->nullable()->change(); // Make middle_name nullable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreate the reports table
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('quarter_id')->constrained('quarters')->onDelete('cascade');
            $table->integer('total_classes')->default(0);
            $table->integer('attended_classes')->default(0);
            $table->integer('absent_classes')->default(0);
            $table->integer('late_classes')->default(0);
            $table->integer('excuse_classes')->nullable()->default(0);
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });

        // Reverse the nullable change in middle_name
        Schema::table('pre_registered_teachers', function (Blueprint $table) {
            $table->string('middle_name')->nullable(false)->change(); // Revert back to non-nullable if needed
        });
    }
};
