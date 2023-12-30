<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeatController extends Controller
{
    public function index()
    {
        $ghengoi = Seat::all();
        if ($ghengoi->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $ghengoi
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no seat found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'stt' => 'required',
            'loaiGhe' => 'required|max:100',
            'giaVe' => 'required',
            'daDat' => 'required',
            'taiKhoanNguoiDat' => 'nullable',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $ghengoi = Seat::create([
                'stt' => $request->stt,
                'loaiGhe' => $request->loaiGhe,
                'giaVe' => $request->giaVe,
                'daDat' => $request->daDat,
                'taiKhoanNguoiDat' => $request->taiKhoanNguoiDat,
            ]);

            if ($ghengoi) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Seat successfully created'
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Something went wrong'
                ], 500);
            };
        }
    }

    public function show($id)
    {
        // $ghengoi = Seat::where('maGhe', $id)->first();
        $ghengoi = Seat::where('maLichChieu',$id)->get();
        if ($ghengoi) {
            return response()->json([
                'status' => 200,
                'content' => $ghengoi
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such seat found'
            ], 404);
        }
    }


    

    public function destroy($id)
    {
        $ghengoi = Seat::where('maGhe', $id)->first();
        if ($ghengoi) {
            $ghengoi->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Seat deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such seat found'
            ], 404);
        }
    }
}
