<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedBack extends Model
{
    use HasFactory;

    protected $table = 'feedback';

    protected $primaryKey = 'maFeedback';

    protected $fillable = [
        'maFeedback',
        'email',
        'tieuDe',
        'noiDung',
        'ngayXuLy',
        'noiDungXuLy'
    ];
}
