<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentArticle extends Model
{
    use HasFactory;

    protected $table = 'comment_article';

    protected $primaryKey = 'maComment';

    protected $fillable = [
        'maComment',
        'username',
        'useremail',
        'comment',
        'maBaiViet',
        'baiViet'
    ];

    public function baiViet()
    {
        return $this->hasMany(TinTuc::class, 'maBaiViet','maBaiViet');
    }
}
