<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;


    protected $table = 'banner_phim';

    protected $primaryKey = 'maBanner';

    protected $fillable = [
        'maBanner',
        'duongDan',
        'hinhAnh',
        'fileName'
    ];

}
