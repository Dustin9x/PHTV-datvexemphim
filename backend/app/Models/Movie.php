<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $table = 'movies';

    protected $primaryKey = 'maPhim';

    protected $fillable = [
        'maPhim',
        'tenPhim',
        'trailer',
        'hinhAnh',
        'moTa',
        'ngayKhoiChieu',
        'danhGia',
        'hot',
        'dangChieu',
        'sapChieu',
        'lichchieu'
    ];
    // public function lichchieu()
    // {
    //     return $this->belongsTo(Showtime::class, 'maPhim','maPhim');
    // }

    public function lichchieu()
    {
        return $this->hasMany(Showtime::class, 'maPhim','maPhim');
    }
    

    // public function rapchieu()
    // {
    //     return $this->hasMany(RapChieu::class, 'maPhim','maPhim');
    //     // ->hasMany(Showtime::class, 'maRap','maRap');
    // }
}
