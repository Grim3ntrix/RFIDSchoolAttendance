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
        Schema::create('pre_registered_teachers', function (Blueprint $table) {
            $table->id();
            $table->string('teacher_id');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('name_extension')->nullable();
            $table->string('sex');
            $table->date('birth_date')->nullable();
            $table->string('address');
            $table->string('email')->nullable();
            $table->string('phone_number', '15');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_registered_teachers');
    }
};
