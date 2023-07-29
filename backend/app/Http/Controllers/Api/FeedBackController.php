<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeedBack;
use Illuminate\Http\Request;

class FeedBackController extends Controller
{
    public function index()
    {
        $feedback = FeedBack::all();
        if ($feedback->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $feedback
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
        if ($request->all()) {
            FeedBack::create([
                'email' => $request->email,
                'tieuDe' => $request->tieuDe,
                'noiDung' => $request->noiDung,
                'ngayXuLy' => $request->ngayXuLy,
                'noiDungXuLy' => $request->noiDungXuLy,
            ]);
            return response()->json([
                'message' => "Comment successfully created."
            ], 200);
        } else {
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }
}
