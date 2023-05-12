<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomClothController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UserController;
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

Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);
Route::post('/add_product',[ProductController::class,'addProduct']);
Route::get('/list',[ProductController::class,'list']);
Route::get('/list/{product:id}',[ProductController::class,'product']);
Route::delete('/delete/{product:id}',[ProductController::class,'delete']);
Route::delete('/delete_showroom/{showroom:id}',[CategoryController::class,'delete']);
Route::get('/edit/{product:id}',[ProductController::class,'edit']);
Route::post('/update/{products:id}',[ProductController::class,'update']);
Route::post('/to_cart',[ProductController::class,'toCart']);
Route::get('/to_cart/{user:id}',[ProductController::class,'cart']);
Route::delete('/to_cart/delete',[ProductController::class,'cartDelete']);
Route::post('/search',[ProductController::class,'search']);
Route::get('/category/{category:id}',[CategoryController::class,'category']);
Route::get('/custom_cloth/{category:id}',[CategoryController::class,'customCloth']);
Route::get('/material_stores',[CategoryController::class,'materials']);
Route::post('/showrooms',[CategoryController::class,'showrooms']);
Route::post('/showroom_cloth/{showroom:id}',[CategoryController::class,'singleShowroom']);
Route::post('/add_department',[DepartmentController::class,'add_department']);
Route::get('/material_stores/{MaterialStore:id}',[DepartmentController::class,'single_material']);
Route::post('/cus_data_save',[CustomClothController::class,'add']);
Route::get('/showroom_product/{id}',[CategoryController::class,'getProducts']);
Route::get('/stripe', [StripeController::class, 'stripe']);
Route::post('/stripe', [StripeController::class, 'stripePost'])->name('stripe.post');

