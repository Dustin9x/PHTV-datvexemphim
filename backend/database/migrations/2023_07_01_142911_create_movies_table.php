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
        Schema::create('movies', function (Blueprint $table) {
            $table->id('maPhim');
            $table->string('tenPhim');
            $table->string('trailer');
            $table->string('hinhAnh');
            $table->string('fileName')->nullable();
            $table->text('moTa');
            $table->date('ngayKhoiChieu');
            $table->integer('danhGia');
            $table->boolean('hot');
            $table->boolean('dangChieu');
            $table->boolean('sapChieu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
