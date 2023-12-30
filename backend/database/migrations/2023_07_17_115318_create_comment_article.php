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
        Schema::create('comment', function (Blueprint $table) {
            $table->id('maComment');
            $table->string('username');
            $table->string('useremail');
            $table->text('comment');            
            $table->unsignedBigInteger('maBaiViet')->nullable();
            $table->unsignedBigInteger('maPhim')->nullable();
            $table->foreign('maBaiViet')->references('maBaiViet')->on('tbnews')->onDelete('CASCADE');
            $table->foreign('maPhim')->references('maPhim')->on('movies')->onDelete('CASCADE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment');
    }
};
