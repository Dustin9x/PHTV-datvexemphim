<?php

use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\HeThongRapController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\RapChieuController;
use App\Http\Controllers\Api\SeatController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentArticleController;
use App\Http\Controllers\Api\CommentMovieController;
use App\Http\Controllers\Api\FeedBackController;
use App\Http\Controllers\Api\OrderDetailController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Api\ShowtimeController;
use App\Http\Controllers\MailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//banner phim
Route::get('laydanhsachbanner', [BannerController::class, 'index']);
Route::post('laydanhsachbanner', [BannerController::class, 'store']);
Route::get('laydanhsachbanner/{id}', [BannerController::class, 'show']);
Route::get('laydanhsachbanner/{id}/edit', [BannerController::class, 'edit']);
Route::post('laydanhsachbanner/{id}/update', [BannerController::class, 'update']);
Route::delete('laydanhsachbanner/{id}/delete', [BannerController::class, 'destroy']);

//phim
Route::get('LayDanhSachPhim', [MovieController::class, 'index']);
Route::post('LayDanhSachPhim', [MovieController::class, 'store']);
Route::get('LayDanhSachPhim/{id}', [MovieController::class, 'show']);
Route::get('LayDanhSachPhim/rap/{id}', [MovieController::class, 'showrap']);
Route::post('LayDanhSachPhim/{id}/update', [MovieController::class, 'update']);
Route::delete('LayDanhSachPhim/{id}/delete', [MovieController::class, 'destroy']);

//he thong rap
Route::get('layhethongrap', [HeThongRapController::class, 'index']);
Route::post('layhethongrap', [HeThongRapController::class, 'store']);
Route::get('layhethongrap/{id}', [HeThongRapController::class, 'show']);
Route::post('layhethongrap/{id}/update', [HeThongRapController::class, 'update']);
Route::delete('layhethongrap/{id}/delete', [HeThongRapController::class, 'destroy']);
Route::get('layhethongrap/khoa', [HeThongRapController::class, 'khoa']);

//tinh - thanh pho
Route::get('laydanhsachtinh', [ProvinceController::class, 'index']);

//rap chieu
Route::get('laydanhsachrap', [RapChieuController::class, 'index']);
Route::post('laydanhsachrap', [RapChieuController::class, 'store']);
Route::get('laydanhsachrap/{id}', [RapChieuController::class, 'show']);
Route::post('laydanhsachrap/{id}/update', [RapChieuController::class, 'update']);
Route::delete('laydanhsachrap/{id}/delete', [RapChieuController::class, 'destroy']);

//lich chieu
Route::get('laydanhsachlichchieu', [ShowtimeController::class, 'index']);
Route::post('laydanhsachlichchieu', [ShowtimeController::class, 'store']);
Route::get('laydanhsachlichchieu/{id}', [ShowtimeController::class, 'show']);
Route::get('laylichchieutheophim/{id}', [ShowtimeController::class, 'showbyMovie']);
Route::post('laydanhsachlichchieu/{id}/update', [ShowtimeController::class, 'update']);
Route::delete('laydanhsachlichchieu/{id}/delete', [ShowtimeController::class, 'destroy']);


//ghe ngoi
Route::get('laydanhsachghe', [SeatController::class, 'index']);
Route::post('laydanhsachghe', [SeatController::class, 'store']);
Route::get('laydanhsachghe/{id}', [SeatController::class, 'show']);
Route::post('laydanhsachghe/{id}/update', [SeatController::class, 'update']);
Route::delete('laydanhsachghe/{id}/delete', [SeatController::class, 'destroy']);

//don hang
Route::get('laydanhsachdonhang', [OrderDetailController::class, 'index']);
Route::post('laydanhsachdonhang', [OrderDetailController::class, 'store']);
Route::post('chonghe', [OrderDetailController::class, 'select']);
Route::get('laychitietdonhang/{id}', [OrderDetailController::class, 'show']);
Route::get('laydanhsachdonhang/{id}', [OrderDetailController::class, 'showByUser']);
Route::get('doanhthu/{year}', [OrderDetailController::class, 'doanhthu']);

//tin tuc
Route::get('laydanhsachtintuc', [PostController::class, 'index']);
Route::post('laydanhsachtintuc', [PostController::class, 'store']);
Route::get('laydanhsachtintuc/{id}', [PostController::class, 'show']);
Route::post('laydanhsachtintuc/{id}/update', [PostController::class, 'update']);
Route::delete('laydanhsachtintuc/{id}/delete', [PostController::class, 'destroy']);

//comment article
Route::get('laydanhsachbinhluan', [CommentArticleController::class, 'index']);
Route::post('laydanhsachbinhluan', [CommentArticleController::class, 'store']);
Route::get('laydanhsachbinhluan/{id}', [CommentArticleController::class, 'show']);
Route::get('laydanhsachbinhluan/{id}/edit', [CommentArticleController::class, 'edit']);
Route::post('laydanhsachbinhluan/{id}/update', [CommentArticleController::class, 'update']);
Route::delete('laydanhsachbinhluan/{id}/delete', [CommentArticleController::class, 'destroy']);

//Review movie
Route::get('laydanhsachbinhluanphim', [CommentMovieController::class, 'index']);
Route::post('laydanhsachbinhluanphim', [CommentMovieController::class, 'store']);
Route::get('laydanhsachbinhluanphim/{id}', [CommentMovieController::class, 'show']);
Route::get('laydanhsachbinhluanphim/{id}/edit', [CommentMovieController::class, 'edit']);
Route::post('laydanhsachbinhluanphim/{id}/update', [CommentMovieController::class, 'update']);
Route::delete('laydanhsachbinhluanphim/{id}/delete', [CommentMovieController::class, 'destroy']);

//user
Route::get('laydanhsachuser', [UsersController::class, 'index']);
Route::post('laydanhsachuser', [UsersController::class, 'store']);
Route::get('laydanhsachuser/{id}', [UsersController::class, 'show']);
Route::post('laydanhsachuser/{id}/update', [UsersController::class, 'update']);
Route::delete('laydanhsachuser/{id}/delete', [UsersController::class, 'destroy']);

//tim kiem
Route::get('timkiem/search/', [PostController::class, 'content']);

//send mail
Route::get('sendMail', [MailController::class, 'sendMail']);

//Feedback
Route::get('laydanhsachfeedback', [FeedBackController::class, 'index']);
Route::post('laydanhsachfeedback', [FeedBackController::class, 'store']);
Route::get('laydanhsachfeedback/{id}', [FeedBackController::class, 'show']);
Route::post('laydanhsachfeedback/{id}/update', [FeedBackController::class, 'update']);
Route::delete('laydanhsachfeedback/{id}/delete', [FeedBackController::class, 'destroy']);


//authen
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('passwordRetrieval', [AuthController::class, 'passwordRetrieval']);

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::delete('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'user']);
    });
});
