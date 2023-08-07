<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

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
        } else if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('laydanhsachuser/{id}')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $imageDirectory = 'images/avatar/';
            $file->move($imageDirectory, $imageName);
            $path = 'http://127.0.0.1:8000/'.($imageDirectory . $imageName);
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => $request->role,
                'avatar' => $path,
            ]);
            return response()->json([
                'message' => "Banner successfully created."
            ], 200);
        } else {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => $request->role,
                'avatar' => null,
            ]);
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
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            if ($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg') {
                return redirect('laydanhsachuser/{id}')->with('loi', 'Bạn chỉ được chọn file có đuôi jpg,png,jpeg');
            }
            $imageDirectory = 'images/avatar/';
            File::delete($imageDirectory . $user->fileName);
            $imageName = Str::random(12) . "." . $file->getClientOriginalExtension();
            $file->move($imageDirectory, $imageName);
            $path = 'http://127.0.0.1:8000/'.($imageDirectory . $imageName);
            $user->avatar = $path;
            $user->fileName = $imageName;
        } else {
            $user->avatar = $request->avatar??null;
            $user->fileName = $request->imageName;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->password = bcrypt($request->password);
        }
        $user->save();

        return response()->json([
            'message' => "User successfully updated."
        ], 200);
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
