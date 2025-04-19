<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Resources\OrderResource;

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

 Route::get('/categories', [CategoryController::class, 'index']);
 Route::get('/categories/{id}', [CategoryController::class, 'show']);
 Route::post('/categories', [CategoryController::class, 'store']);
 Route::put('/categories/{id}', [CategoryController::class, 'update']);
 Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

//  Route::get('/orders', [OrderController::class, 'index']);
//  Route::get('/orders/{id}', [OrderController::class, 'show']);
//  Route::post('/orders', [OrderController::class, 'store']);
//  Route::put('/orders/{id}', [OrderController::class, 'update']);
//  Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

Route::apiResource('orders', OrderController::class);

// Route::get('/users', [UserController::class, 'index']);
// Route::get('/users/{id}', [UserController::class, 'show']);

// Route::resource('/products', ProductController::class);

// Route::get('/categories/{id}/products', [CategoryProductController::class, 'index'])->name('categories.products.index');

//Route::resource('categories.products', ProductCategoryController::class)->only('index');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//Route::middleware('auth:sanctum')->group(function(){
 //   Route::get('product-category', [ProductCategoryController::class, 'index']);
//});

