<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

Route::get('/', fn()=>view('app'));

Route::resource('categories', CategoryController::class);
Route::resource('products', ProductController::class);

Route::get('/templates/{template}', function ($template) {
    return view('templates.' . $template);
});
