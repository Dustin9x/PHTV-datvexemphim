<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RapChieu;
use App\Models\Showtime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RapChieuController extends Controller
{
    public function index()
    {
        $rapchieu = RapChieu::with('tinhThanh')->get();
        if ($rapchieu->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $rapchieu
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no rap chieu found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
       
            $rapchieu = RapChieu::create([
                'tenRap' => $request->tenRap,
                'diaChi' => $request->diaChi,
                'maPhim' => $request->maPhim,
                'maTinh_id' => $request->maTinh_id,
            ]);

            if ($rapchieu){
                return response()->json([
                    'status' => 200,
                    'message' => 'Theatre successfully created',
                    'content' => $rapchieu
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
        $rapchieu = RapChieu::where('maRap', $id)->first();
        if ($rapchieu) {
            return response()->json([
                'status' => 200,
                'content' => $rapchieu
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such theatre found'
            ], 404);
        }
    }


    public function update(Request $request, $id)
    {
        
        $validator = Validator::make($request->all(), [
            'tenRap' => 'required|string|max:100',
            'diaChi' => 'required|string|max:200',
            'maTinh' => 'nullable',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $rapchieu = RapChieu::where('maRap', $id)->first();
            if($rapchieu){
                $rapchieu->update([
                    'tenRap' => $request->tenRap,
                    'diaChi' => $request->diaChi,
                    'maTinh_id' => $request->maTinh_id,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Theatre successfully updated'
                ], 200);
            }else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No such theatre found',
                    'errors' => response()->errors()->toArray(),
                ], 404);
            };
        }
    }

    public function destroy($id)
    {
        $rapchieu = RapChieu::where('maRap', $id)->first();
        if ($rapchieu) {
            $rapchieu->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Theatre deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such theatre found'
            ], 404);
        }
    }
}
