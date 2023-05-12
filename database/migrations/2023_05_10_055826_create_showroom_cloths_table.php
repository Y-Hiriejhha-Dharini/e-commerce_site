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
        Schema::create('showroom_cloths', function (Blueprint $table) {
            $table->id();
            $table->foreignId('showroom_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('pro_id');
            $table->string('pro_name');
            $table->string('pro_desc');
            $table->string('file_path');
            $table->integer('status')->default(0)->comment('0-active, 1-inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('showroom_cloths');
    }
};
