<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\TinTuc;
use Illuminate\Http\Request;

class PostController extends Controller
{
    
    public function index()
    {
        $news = TinTuc::all();
        if ($news->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $news
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no news found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        if ($request->hasFile('hinhAnh')) {
            $file = $request->file('hinhAnh');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('create')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $imageDirectory = 'images/tintuc/';
            $file->move($imageDirectory, $imageName);
            $path   = 'http://127.0.0.1:8000/' . ($imageDirectory . $imageName);
            TinTuc::create([
                'tieuDe' => $request->tieuDe,
                'tacGia' => $request->tacGia,
                'noiDungPhu' => $request->noiDungPhu,
                'noiDung' => $request->noiDung,
                'hinhAnh' => $path,
                'fileName' => $imageName,
                'theLoai' => $request->theLoai,
            ]);
            return response()->json([
                'message' => "News successfully created."
            ], 200);
        } else {
            $imageName = null;
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    
    public function show(string $id)
    {
        //
        $news = TinTuc::where('maBaiViet', $id)->first();
        if ($news) {
            return response()->json([
                'status' => 200,
                'content' => $news
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such news found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $news = TinTuc::where('maBaiViet', $id)->first();
        $news->tieuDe = $request->tieuDe;
        $news->tacGia = $request->tacGia;
        $news->noiDungPhu = $request->noiDungPhu;
        $news->noiDung = $request->noiDung;
        // $news->image = $request->$path;
        $news->theLoai = $request->theLoai;
        if ($request->hasFile('hinhAnh')) {
            $file = $request->file('hinhAnh');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('create')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }

            $imageDirectory = 'images/tintuc/';
            File::delete($imageDirectory . $news->fileName);
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $file->move($imageDirectory, $imageName);
            $path   = 'http://127.0.0.1:8000/' . ($imageDirectory . $imageName);
            $news->hinhAnh = $path;
            $news->fileName = $imageName;
        } else {
            $news->hinhAnh = $request->hinhAnh;
        }
        $news->save();

        return response()->json([
            'message' => "News successfully updated."
        ], 200);
    }

    public function destroy(string $id)
    {
        //
        $news = TinTuc::where('maBaiViet', $id)->first();
        if ($news) {
            $news->delete();
            $imageDirectory = 'images/banner/';
            File::delete($imageDirectory . $news->fileName);
            return response()->json([
                'status' => 200,
                'message' => 'News deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such news found'
            ], 404);
        }
    }


    public function content( Request $request)
    {
        $search = $request->input('search');
        $news = TinTuc::where('tieuDe', 'LIKE', "%" . $search . "%")->get();

        $movie = Movie::where('tenPhim', 'LIKE', "%" . $search . "%")->get();

        if ($news->count() >= 0 || $movie->count()>=0) {
            return response()->json([
                'status' => 200,
                'content' => ['news'=>$news,'movie'=>$movie]
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'ahhh ! no such news and movies found !'
            ], 404);
        }
    }
}
