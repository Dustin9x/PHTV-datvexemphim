<?php
// app/Http/Controllers/AuthController.php
 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
 
class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'role' => 'nullable|string',
            'avatar' => 'nullable|string',
            'fileName' => 'nullable|string'
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'status' => '401',
                'message' => 'Email này đã được sử dụng',
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()->toArray(),
            ]);
        } else {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
            return response()->json([
                'status' => 200,
            ]);
        }

        
 
        // $user = new User([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => bcrypt($request->password)
        // ]);
 
        // $user->save();
 
        
    }
 
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember' => 'boolean'
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fails',
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()->toArray(),
            ]);
        }
 
        $credentials = request(['email', 'password']);
 
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'fails',
                'message' => 'Sai tên đăng nhập hoặc mật khẩu'
            ], 401);
        }
 
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
 
        if ($request->remember) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
 
        $token->save();
 
        return response()->json([
            'status' => 200,
            'content' => ['content'=>$user,
            'accessToken' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()]
        ],200);
    }
 
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'status' => 'success',
        ]);
    }
 
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}