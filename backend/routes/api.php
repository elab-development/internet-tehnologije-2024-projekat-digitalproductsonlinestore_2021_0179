<?php

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PreviewController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');


//za neulogovane korisnike
Route::group([], function () {
    Route::get('products/search', [ProductController::class, 'search']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::get('/categories/{category}/products', [CategoryController::class, 'getProducts']);
});

//za ulogovane korisnike
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    }); // Pregled korisničkog profila bez narudžbina
    Route::apiResource('orders', OrderController::class);
    Route::get('/my-orders', [OrderController::class, 'myOrders']);

    Route::get('/preview-pdf/{filename}', [PreviewController::class, 'getPreview']);


    // Laravel routes (api.php)
    Route::get('/products/{id}/preview', [ProductController::class, 'preview']);
    Route::get('/products/{id}/download', [ProductController::class, 'download'])->middleware('auth:sanctum');
});

//za admin korisnike
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']); // Pregled korisničkog profila sa narudžbinama
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Manipulacija Proizvodima
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Manipulacija Kategorijama
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // Pregled korisničkih narudžbina
    Route::get('users/{user}/orders', [UserController::class, 'getOrders']);

    // Pregled svih korisnika (samo admin)
    Route::get('/auth/users', [AuthController::class, 'getAllUsers']);

    //Route::get('/admin/purchases-per-category', [OrderController::class, 'getPurchasesPerCategory']);

});
