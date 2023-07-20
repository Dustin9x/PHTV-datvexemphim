<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeThongRap;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class HeThongRapController extends Controller
{
    public function index()
    {
        $hethongrap = HeThongRap::all();
        if ($hethongrap->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $hethongrap
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no hethongrap found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $rules = array('tenHeThongRap' => 'unique:hethongrap,tenHeThongRap');

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'message' => 'Tên hệ thống rạp đã có trong danh sách, bạn không cần tạo thêm nữa nhé'
            ], 500);
        } else {
            if ($request->hasFile('logo')) {
                $file = $request->file('logo');
                $extension = $file->getClientOriginalExtension();
                if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                    return redirect('layhethongrap')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
                }
                $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
                $imageDirectory = 'images/hethongrap/';
                $file->move($imageDirectory, $imageName);
                $path   = 'http://127.0.0.1:8000/'.($imageDirectory . $imageName);
                HeThongRap::create([
                    'tenHeThongRap' => $request->tenHeThongRap,
                    'logo' => $path,
                ]);
                return response()->json([
                    'message' => "Theatre system successfully created."
                ], 200);
            } else {
                $imageName = null;
                return response()->json([
                    'message' => "Something went really wrong!"
                ], 500);
            }
        }
        
    }


    public function show($id)
    {
        $hethongrap = HeThongRap::where('maHeThongRap', $id)->first();
        if ($hethongrap) {
            return response()->json([
                'status' => 200,
                'content' => $hethongrap
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such theatre system found'
            ], 404);
        }
    }


    public function update(Request $request, $id)
    {
        $hethongrap = HeThongRap::where('maHeThongRap', $id)->first();
        $hethongrap->tenHeThongRap = $request->tenHeThongRap;
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('layhethongrap')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }

            File::delete($hethongrap->logo);
            $imageDirectory = 'images/hethongrap/';
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $file->move($imageDirectory, $imageName);
            $path   = public_path($imageDirectory . $imageName);
            $hethongrap->logo = $path;
        } else {
            $hethongrap->logo = $request->logo;
        }
        $hethongrap->save();

        return response()->json([
            'message' => "Theatre system successfully updated."
        ], 200);
    }

    public function destroy($id)
    {
        $hethongrap = HeThongRap::where('maHeThongRap', $id)->first();
        if ($hethongrap) {
            $hethongrap->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Theatre system deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such theatre system found'
            ], 404);
        }
    }

}
