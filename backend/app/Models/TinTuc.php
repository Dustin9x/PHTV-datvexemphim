<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TinTuc extends Model
{
    use HasFactory;
    protected $table ='tbnews';

    protected $primaryKey = 'maBaiViet';

    protected $fillable = [
        'maBaiViet',
        'tieuDe',
        'tacGia',
        'noiDungPhu',
        'noiDung',
        'hinhAnh',
        'fileName',
        'theLoai',
        'maPhim'
    ];
}
