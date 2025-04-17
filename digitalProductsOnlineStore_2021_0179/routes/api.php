<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductCategoryController;

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
 Route::get('/products', [ProductController::class, 'index']);
 Route::get('/products/{id}', [ProductController::class, 'show']);
 Route::post('/products', [ProductController::class, 'store']);
 Route::put('/products/{id}', [ProductController::class, 'update']);
 Route::delete('/products/{id}', [ProductController::class, 'destroy']);



// Route::get('/users', [UserController::class, 'index']);
// Route::get('/users/{id}', [UserController::class, 'show']);

// Route::resource('/products', ProductController::class);

// Route::get('/categories/{id}/products', [CategoryProductController::class, 'index'])->name('categories.products.index');

Route::resource('categories.products', ProductCategoryController::class)->only('index');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function(){
    Route::get('product-category', [ProductCategoryController::class, 'index']);
});

