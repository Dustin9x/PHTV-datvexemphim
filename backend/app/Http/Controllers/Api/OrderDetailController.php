<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class OrderDetailController extends Controller
{
    public function index()
    {
        $order = OrderDetail::all();
        if ($order->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $order
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no oder found'
            ], 404);
        }
    }

    public function select(Request $request)
    {
        $arrMaGhe = array_map('intval', explode(', ', $request->danhSachMaGhe));

        Seat::whereIn("maGhe", $arrMaGhe)
            ->update([
                'nguoiChon' => $request->userId,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Order successfully created',
            ], 200);
    }


    public function store(Request $request)
    {

        $order = OrderDetail::create([
            'maLichChieu' => $request->maLichChieu,
            'rapChieu' => $request->rapChieu,
            'maPhim' => $request->maPhim,
            'phim' => $request->phim,
            'gioChieu' => $request->gioChieu,
            'ngayChieu' => $request->ngayChieu,
            'danhSachGhe' => $request->danhSachGhe,
            'tongTien' => $request->tongTien,
            'userId' => $request->userId,
            'name' => $request->name,
            'email' => $request->email,
        ]);

        $tkEmail = $request->email;
        $arrMaGhe = array_map('intval', explode(', ', $request->danhSachMaGhe));

        Seat::whereIn("maGhe", $arrMaGhe)
            ->update([
                'nguoiDat' => $request->userId,
            ]);


        if ($order) {
            Mail::send('mail.sendEmail',  array(
                // 'maLichChieu' => $request->maLichChieu,
                'rapChieu' => $request->rapChieu,
                'phim' => $request->phim,
                'gioChieu' => $request->gioChieu,
                'ngayChieu' => $request->ngayChieu,
                'danhSachGhe' => $request->danhSachGhe,
                'tongTien' => $request->tongTien,
                'name' => $request->name,
                'email' => $request->email,
            ), function ($message) use ($tkEmail) {
                $message->to($tkEmail, '$request->name')->subject('PHTV - Thông tin đặt vé');
                // $message->attach();
            });
            return response()->json([
                'status' => 200,
                'message' => 'Order successfully created',
                'content' => $order
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Something went wrong'
            ], 500);
        };
    }

    public function show($id)
    {
        $order = OrderDetail::where('maOrder', $id)->first();
        if ($order) {
            return response()->json([
                'status' => 200,
                'content' => $order
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such order found'
            ], 404);
        }
    }


    public function showByUser($id)
    {
        $order = OrderDetail::where('userId', $id)->get();
        if ($order) {
            return response()->json([
                'status' => 200,
                'content' => $order
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such order found'
            ], 404);
        }
    }


    public function doanhthu($year)
    {
        $order = OrderDetail::whereYear('created_at', $year)->get();
        if ($order->count() >= 0) {
            return response()->json([
                'status' => 200,
                'content' => $order
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no oder found'
            ], 404);
        }
    }
}
