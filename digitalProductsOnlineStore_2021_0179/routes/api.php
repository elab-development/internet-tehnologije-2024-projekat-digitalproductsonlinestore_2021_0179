<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTestController;
use App\Http\Controllers\CategoryProductController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::get('/products/{id}', [ProductTestController::class, 'show']);
// Route::get('/products', [ProductTestController::class, 'index']);

// Route::get('/users', [UserController::class, 'index']);
// Route::get('/users/{id}', [UserController::class, 'show']);

Route::resource('/products', ProductController::class);

// Route::get('/categories/{id}/products', [CategoryProductController::class, 'index'])->name('categories.products.index');

Route::resource('categories.products', CategoryProductController::class)->only('index');