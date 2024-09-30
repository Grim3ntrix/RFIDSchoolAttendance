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
      Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            $table->foreignId('section_id')
                  ->constrained('sections')
                  ->onDelete('cascade');
            $table->string('school_id')
                  ->nullable();
            $table->string('rfid_serial_number')
                  ->unique();
            $table->string('batch');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name')
                  ->nullable();
            $table->string('name_extension')
                  ->nullable();
            $table->string('sex');
            $table->string('birth_date');
            $table->string('email');
            $table->string('phone_number')
                  ->nullable();
            $table->string('address')
                  ->nullable();
            $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
