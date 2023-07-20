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
        Schema::create('commnet_article', function (Blueprint $table) {
            $table->id('maComment');
            $table->string('username');
            $table->string('useremail');
            $table->text('comment');
            $table->unsignedBigInteger('maBaiViet')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commnet_article');
    }
};
