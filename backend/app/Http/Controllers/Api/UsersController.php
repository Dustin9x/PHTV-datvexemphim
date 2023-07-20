<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $user = User::all();
        if ($user->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no user found'
            ], 404);
        }
    }


    public function store(Request $request)
    {
        $rules = array('email' => 'unique:users,email');

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'message' => 'Email đã được sử dụng'
            ], 500);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => $request->role,
            ]);
            if ($user) {
                return response()->json([
                    'status' => 200,
                    'message' => 'User successfully created'
                ], 200);
            }
        }
    }

    public function show($id)
    {
        $user = User::where('id', $id)->first();
        if ($user) {
            return response()->json([
                'status' => 200,
                'content' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no user found'
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $user = User::where('id', $id)->first();
        if ($user) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => $request->role,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'User successfully updated'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such user found'
            ], 404);
        };
    }

    public function destroy($id)
    {
        $user = User::where('id', $id)->first();
        if ($user) {
            $user->delete();
            return response()->json([
                'status' => 200,
                'message' => 'User deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such user found'
            ], 404);
        }
    }
}
