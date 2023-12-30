<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    function sendMail()
    {
        $data = 'phú';
        $ngayChieu = '9/1/2004';
        $danhSachGhe = 'f2,b5';
        Mail::send('mail.sendEmail',  array(
            'name' => $data,
            'ngayChieu' => $ngayChieu,
            'danhSachGhe' => $danhSachGhe
        ), function ($email) {
            $email->to('lptp.tranphu@gmail.com', 'phus')->subject('thong tin mua ve');
            // $email->attach('images/avatar/4o5BlKblgzij.jpg');
        });
    }
    
}
