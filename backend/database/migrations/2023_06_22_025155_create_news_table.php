<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbnews', function (Blueprint $table) {
            $table->id('maBaiViet');
            $table->string('tieuDe');
            $table->string('tacGia');
            $table->text('noiDungPhu');             
            $table->text('noiDung');
            $table->string('hinhAnh');  
            $table->string('fileName')->nullable();        
            $table->string('theLoai');
            $table->unsignedBigInteger('maPhim')->nullable(); 
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbnews');
    }
};