<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    public function index()
    {
        $province = Province::all();
        if ($province->count() > 0) {
            return response()->json([
                'status' => 200,
                'content' => $province
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no province found'
            ], 404);
        }
    }
}
