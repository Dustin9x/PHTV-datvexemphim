<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentMovieController extends Controller
{
    public function index()
    {
        $comment = Comment::with('tinPhim')->get();
        if ($comment->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $comment
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no comment found'
            ], 404);
        }
    }


    public function store(Request $request)
    {
        if ($request->all()) {
            Comment::create([
                'username' => $request->username,
                'useremail' => $request->useremail,
                'comment' => $request->comment,
                'maPhim' => $request->maPhim,
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

    public function update(Request $request, $id)
    {
        $comment = Comment::where('maComment', $id)->first();
        if ($request->all()) {
            $comment->username = $request->username;
            $comment->useremail = $request->useremail;
            $comment->comment = $request->comment;
            $comment->maPhim = $request->maPhim;
        }
        $comment->save();

        return response()->json([
            'message' => "Comment successfully updated."
        ], 200);
    }


    public function show($id)
    {
        $comment = Comment::where('maPhim', $id)->with('tinPhim')->get();
        if ($comment) {
            return response()->json([
                'status' => 200,
                'content' => $comment
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such comment found'
            ], 404);
        }
    }

    public function destroy($id)
    {
        $comment = Comment::where('maComment', $id)->first();
        if ($comment) {
            $comment->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Comment deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such comment found'
            ], 404);
        }
    }


    public function edit($id)
    {
        $comment = Comment::where('maComment', $id)->first();
        if ($comment) {
            return response()->json([
                'status' => 200,
                'content' => $comment
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no such comment found'
            ], 404);
        }
    }
}
