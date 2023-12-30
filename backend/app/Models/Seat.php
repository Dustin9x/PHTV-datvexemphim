<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    protected $table = 'seats';

    protected $primaryKey = 'maGhe';

    protected $fillable = [
        'maGhe',
        'tenGhe',
        'loaiGhe',
        'nguoiDat',
        'nguoiChon',
        'maLichChieu',
    ];
}
