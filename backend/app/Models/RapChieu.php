<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RapChieu extends Model
{
    use HasFactory;

    protected $table = 'rapchieu';

    protected $primaryKey = 'maRap';

    protected $fillable = [
        'maRap',
        'tenRap',
        'diaChi',
        'maTinh_id',
        'tinhThanh'
    ];

    public function tinhThanh()
    {
        return $this->hasMany(Province::class, 'maTinh','maTinh_id');
    }

    public function lichchieu()
    {
        return $this->belongsTo(Showtime::class, 'maRap','maRap');
    }
}
