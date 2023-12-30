<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table ='orderdetail';

    protected $primaryKey = 'maOrder';

    protected $fillable = [
        'maOrder',
        'maLichChieu',
        'rapChieu',
        'maPhim',
        'phim',
        'gioChieu',
        'ngayChieu',
        'danhSachGhe',
        'tongTien',
        'userId',
        'name',
        'email'
    ];
}
