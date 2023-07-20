<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{
    public function index()
    {
        $movie = Movie::all();
        if ($movie->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $movie
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no movie found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        if ($request->hasFile('hinhAnh')) {
            $file = $request->file('hinhAnh');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('laydanhsachphim')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $imageDirectory = 'images/movie/';
            $file->move($imageDirectory, $imageName);
            // $path   = public_path($imageDirectory . $imageName);
            $path   = 'http://127.0.0.1:8000/'.($imageDirectory . $imageName);
            Movie::create([
                'tenPhim' => $request->tenPhim,
                'trailer' => $request->trailer,
                'hinhAnh' => $path,
                'moTa' => $request->moTa,
                'ngayKhoiChieu' => $request->ngayKhoiChieu,
                'danhGia' => $request->danhGia,
                'hot' => $request->boolean('hot'),
                'dangChieu' => $request->boolean('dangChieu'),
                'sapChieu' => $request->boolean('sapChieu'),
            ]);
            return response()->json([
                'message' => "Movie successfully created."
            ], 200);
        } else {
            $imageName = null;
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }


    public function show($id)
    {
        $movie = Movie::where('maPhim', $id)->first();
        if ($movie) {
            return response()->json([
                'status' => 200,
                'content' => $movie
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such movie found'
            ], 404);
        }
    }

    public function showrap($id)
    {
        // $movie = Movie::where('maPhim', $id)->first();
        $movie = Movie::with('maRap', $id)->get();

        if ($movie) {
            return response()->json([
                'status' => 200,
                'content' => $movie
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such movie found'
            ], 404);
        }
    }


    public function update(Request $request, $id)
    {
        $movie = Movie::where('maPhim', $id)->first();
        $movie->tenPhim = $request->tenPhim;
        $movie->trailer = $request->trailer;
        $movie->moTa = $request->moTa;
        $movie->ngayKhoiChieu = $request->ngayKhoiChieu;
        $movie->danhGia = $request->danhGia;
        $movie->hot = $request->boolean('hot');
        $movie->dangChieu = $request->boolean('dangChieu');
        $movie->sapChieu = $request->boolean('sapChieu');
        if ($request->hasFile('hinhAnh')) {
            $file = $request->file('hinhAnh');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('laydanhsachphim')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }

            File::delete($movie->hinhAnh);
            $imageDirectory = 'images/movie/';
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $file->move($imageDirectory, $imageName);
            $path   = 'http://127.0.0.1:8000/'.($imageDirectory . $imageName);
            $movie->hinhAnh = $path;
        } else {
            $movie->hinhAnh = $request->hinhAnh;
        }
        $movie->save();

        return response()->json([
            'message' => "Banner successfully updated."
        ], 200);
    }

    public function destroy($id)
    {
        $movie = Movie::where('maPhim', $id)->first();
        if ($movie) {
            $movie->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Movie deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such movie found'
            ], 404);
        }
    }
}
