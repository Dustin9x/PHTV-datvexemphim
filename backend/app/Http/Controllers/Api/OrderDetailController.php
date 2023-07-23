<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use App\Models\Seat;
use Illuminate\Http\Request;

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


    public function store(Request $request)
    {
       
            $order = OrderDetail::create([
                'maLichChieu' => $request->maLichChieu,
                'rapChieu' => $request->rapChieu,
                'phim' => $request->phim,
                'gioChieu' => $request->gioChieu,
                'ngayChieu' => $request->ngayChieu,
                'danhSachGhe' => $request->danhSachGhe,
                'tongTien' => $request->tongTien,
                'userId' => $request->userId,
                'name' => $request->name,
                'email' => $request->email,
            ]);
            
            $arrMaGhe = array_map('intval', explode(', ', $request->danhSachMaGhe));

            Seat::whereIn("maGhe", $arrMaGhe)
                ->update([
                    'nguoiDat' => $request->userId,
                ]);
    

            if ($order){
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
}