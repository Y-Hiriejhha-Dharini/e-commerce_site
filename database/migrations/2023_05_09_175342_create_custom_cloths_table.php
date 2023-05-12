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
        Schema::create('custom_cloths', function (Blueprint $table) {
            $table->id();
            $table->integer('cus_id');
            $table->string('size');
            $table->string('price');
            $table->integer('mat_id');
            $table->integer('status')->comment('0-booked, 1-not booked, 2-delivered');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_cloths');
    }
};
