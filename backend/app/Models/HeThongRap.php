<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeThongRap extends Model
{
    use HasFactory;

    protected $table = 'hethongrap';

    protected $primaryKey = 'maHeThongRap';

    protected $fillable = [
        'maHeThongRap',
        'tenHeThongRap',
        'logo'
    ];

    public function rap () {
        return $this->hasMany(RapChieu::class,'maHeThongRap','maHeThongRap');
}
}