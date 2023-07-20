<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Showtime extends Model
{
    use HasFactory;

    protected $table = 'showtime';

    protected $primaryKey = 'maLichChieu';

    protected $fillable = [
        'maLichChieu',
        'maPhim',
        'maRap',
        'ngayChieu',
        'gioChieu',
        'giaVeThuong',
        'giaVeVip',
        'rapChieu',
        'phim',
        'danhSachGhe'
    ];

    public function rapChieu()
    {
        return $this->hasMany(RapChieu::class, 'maRap','maRap');
    }

    public function phim()
    {
        return $this->hasMany(Movie::class, 'maPhim','maPhim');
    }

    public function danhSachGhe()
    {
        return $this->hasMany(Movie::class, 'maLichChieu','maLichChieu');
    }
}
