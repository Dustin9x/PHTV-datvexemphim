<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\support\facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class BannerController extends Controller
{
    public function index()
    {
        $banner = Banner::all();
        if ($banner->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $banner
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no banner found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        if ($request->hasFile('hinhAnh')) {
            $file = $request->file('hinhAnh');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('laydanhsachbanner')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $imageDirectory = 'images/banner/';
            $file->move($imageDirectory, $imageName);
            $path = 'http://127.0.0.1:8000/'.($imageDirectory . $imageName);
            Banner::create([
                'duongDan' => $request->duongDan,
                'fileName' => $imageName,
                'hinhAnh' => $path
            ]);
            return response()->json([
                'message' => "Banner successfully created."
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
        $banner = Banner::where('maBanner', $id)->first();
        if ($banner) {
            return response()->json([
                'status' => 200,
                'content' => $banner
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such banner found'
            ], 404);
        }
    }


    public function update(Request $request, $id)
    {
        $banner = Banner::where('maBanner', $id)->first();
        $banner->duongDan = $request->duongDan;
        if ($request->hasFile('hinhAnh')) {
            $file = $request->file('hinhAnh');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('laydanhsachbanner')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }
            $imageDirectory = 'images/banner/';
            File::delete($imageDirectory . $banner->fileName);
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $file->move($imageDirectory, $imageName);
            $path = 'http://127.0.0.1:8000/'.($imageDirectory . $imageName);
            $banner->hinhAnh = $path;
            $banner->fileName = $imageName;
        } else {
            $banner->hinhAnh = $request->hinhAnh;
            $banner->fileName = $request->imageName;
            $banner->duongDan = $request->duongDan;
        }
        $banner->save();

        return response()->json([
            'message' => "Banner successfully updated."
        ], 200);
    }


    public function destroy($id)
    {
        $banner = Banner::where('maBanner', $id)->first();
        if ($banner) {
            $banner->delete();
            $imageDirectory = 'images/banner/';
            File::delete($imageDirectory . $banner->fileName);
            return response()->json([
                'status' => 200,
                'message' => 'Banner deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such banner found'
            ], 404);
        }
    }
}
