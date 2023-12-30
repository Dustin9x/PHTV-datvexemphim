<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeedBack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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


    public function show($id)
    {
        $feedback = FeedBack::where('maFeedback', $id)->first();
        if ($feedback) {
            return response()->json([
                'status' => 200,
                'content' => $feedback
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such feedback found'
            ], 404);
        }
    }


    public function update(Request $request, $id)
    {
        $feedback = FeedBack::where('maFeedback', $id)->first();
        if ($request->all()) {
            $feedback->email = $request->email;
            $feedback->tieuDe = $request->tieuDe;
            $feedback->noiDung = $request->noiDung;
            $feedback->ngayXuLy = $request->ngayXuLy;
            $feedback->noiDungXuLy = $request->noiDungXuLy;
        }
        $tkEmail = $request->email;
        if ($feedback) {
            Mail::send('mail.sendEmailFeedback',  array(
                'tieuDe' => $request->tieuDe,
                'noiDung' => $request->noiDung,
                'ngayXuLy' => $request->ngayXuLy,
                'noiDungXuLy' => $request->noiDungXuLy,
            ), function ($message) use ($tkEmail) {
                $message->to($tkEmail, 'name')->subject('PHTV - Thông tin feedback');
                // $message->attach();
            });
        }
        $feedback->save();

        return response()->json([
            'message' => "Feedback successfully updated."
        ], 200);
    }


    public function destroy($id)
    {
        $feedback = FeedBack::where('maFeedback', $id)->first();
        if ($feedback) {
            $feedback->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Feedback deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such feedback found'
            ], 404);
        }
    }
}
