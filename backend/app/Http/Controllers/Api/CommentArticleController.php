<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentArticleController extends Controller
{
    public function index()
    {
        $comment = Comment::with('baiViet')->get();
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
                'maBaiViet' => $request->maBaiViet,
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
            $comment->maBaiViet = $request->maBaiViet;
        }
        $comment->save();

        return response()->json([
            'message' => "Comment successfully updated."
        ], 200);
    }


    public function show($id)
    {
        $comment = Comment::where('maBaiViet', $id)->with('baiViet')->get();
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
