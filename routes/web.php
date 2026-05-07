<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SizeController;

Route::get('/', function () {
    return view('app');
});

Route::resource('categories', CategoryController::class);
Route::resource('products', ProductController::class);
Route::resource('sizes', SizeController::class);

Route::get('/templates/{template}', function($template){
    $template = str_replace(".html","",$template);
    return view('templates.'.$template);
});