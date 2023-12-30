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
        Schema::create('showtime', function (Blueprint $table) {
            $table->id('maLichChieu');
            $table->date('ngayChieu');
            $table->time('gioChieu');
            $table->integer('giaVeThuong');
            $table->integer('giaVeVip');
            $table->unsignedBigInteger('maPhim')->nullable();
            $table->unsignedBigInteger('maRap')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
