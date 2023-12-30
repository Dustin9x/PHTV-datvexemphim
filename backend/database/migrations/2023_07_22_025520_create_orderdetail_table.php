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
        Schema::create('orderdetail', function (Blueprint $table) {
            $table->id('maOrder');
            $table->unsignedBigInteger('maLichChieu');
            $table->string('rapChieu');
            $table->integer('maPhim');
            $table->string('phim');
            $table->string('gioChieu');
            $table->string('ngayChieu');
            $table->string('danhSachGhe');
            $table->string('userId');
            $table->string('name');
            $table->string('email');
            $table->integer('tongTien');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orderdetail');
    }
};
