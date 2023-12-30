<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comment';

    protected $primaryKey = 'maComment';

    protected $fillable = [
        'maComment',
        'username',
        'useremail',
        'comment',
        'maBaiViet',
        'maPhim',
        'baiViet',
        'tinPhim'
    ];

    public function baiViet()
    {
        return $this->hasMany(TinTuc::class, 'maBaiViet','maBaiViet');
    }

    public function tinPhim()
    {
        return $this->hasMany(Movie::class, 'maPhim','maPhim');
    }
}
