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
        Schema::create('rapchieu', function (Blueprint $table) {
            $table->id('maRap');
            $table->string('tenRap');
            $table->unsignedBigInteger('maTinh_id')->nullable();
            $table->string('diaChi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rapchieu');
    }
};
