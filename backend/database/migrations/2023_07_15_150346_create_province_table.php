<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Database\Seeders\create_province_seeder;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('province', function (Blueprint $table) {
            $table->id('maTinh');
            $table->string('tenTinh');
            $table->timestamps();
        });
        $seeder = new create_province_seeder;
        $seeder->run();
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('province');
    }
};
