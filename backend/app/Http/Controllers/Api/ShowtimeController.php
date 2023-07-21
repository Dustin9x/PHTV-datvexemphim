<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Seat;
use App\Models\Showtime;
use Illuminate\Http\Request;

class ShowtimeController extends Controller
{
    public function index()
    {
        // $showtime = Showtime::all();
        $showtime = Showtime::with(['rapchieu', 'phim'])->get();
        if ($showtime->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $showtime
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no showtime found'
            ], 404);
        }
    }

    public function showbyMovie($id)
    {
        // $showtime = Showtime::with(['rapchieu','phim'])->get();
        // $showtime = Showtime::where('maPhim',$id)with(['rapchieu','phim'])->get();
        $showtime = Showtime::where('maPhim', $id)->with(['rapchieu','rapchieu.tinhthanh', 'phim'])->get();
        // $movie = Movie::where('maPhim', $id)->first();
        if ($showtime) {
            return response()->json([
                'status' => 200,
                'content' => $showtime
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such showtime found'
            ], 404);
        }
    }

    public function show($id)
    {
        // $showtime = Showtime::with(['rapchieu','phim'])->get();
        // $showtime = Showtime::where('maPhim',$id)with(['rapchieu','phim'])->get();
        // $showtime = Showtime::where('maPhim', $id)->with(['rapchieu','rapchieu.tinhthanh', 'phim'])->get();
        $showtime = Showtime::where('maLichChieu', $id)->with(['rapchieu','phim'])->first();
        if ($showtime) {
            return response()->json([
                'status' => 200,
                'content' => $showtime,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such showtime found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $showtime = Showtime::create([
            'ngayChieu' => $request->ngayChieu,
            'gioChieu' => $request->gioChieu,
            'giaVeThuong' => $request->giaVeThuong,
            'giaVeVip' => $request->giaVeVip,
            'maPhim' => $request->maPhim,
            'maRap' => $request->maRap,
        ]);

        if ($showtime) {
            for ($i = 1; $i <= 160; $i++) {
                if (
                    ($i >= 35   && $i <= 46) ||
                    ($i >= 51   && $i <= 62) ||
                    ($i >= 67   && $i <= 78) ||
                    ($i >= 83   && $i <= 94) ||
                    ($i >= 99   && $i <= 110) ||
                    ($i >= 115   && $i <= 126)
                ) {
                    $loaighe = 'vip';
                } else {
                    $loaighe = 'thuong';
                }
                Seat::insert([
                    'tenGhe' => $i,
                    'loaiGhe' => $loaighe,
                    'maLichChieu' => $showtime->maLichChieu,
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Showtime successfully created',
                'content' => $showtime
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Showtime not successfully created'
            ], false);
        }
    }

    public function update(Request $request, $id)
    {
        $showtime = Showtime::where('maLichChieu', $id)->first();
        if ($showtime) {
            $showtime->update([
                'ngayChieu' => $request->ngayChieu,
                'gioChieu' => $request->gioChieu,
                'giaVeThuong' => $request->giaVeThuong,
                'giaVeVip' => $request->giaVeVip,
                'maPhim' => $request->maPhim,
                'maRap' => $request->maRap,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Showtime successfully updated'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such showtime found',
                'errors' => response()->errors()->toArray(),
            ], 404);
        };
    }

    public function destroy($id)
    {
        $showtime = Showtime::where('maLichChieu', $id)->first();
        if ($showtime) {
            $showtime->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Showtime deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such Showtime found'
            ], 404);
        }
    }
}
