<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoveResponseController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/response', [LoveResponseController::class, 'index']);
Route::post('/response', [LoveResponseController::class, 'store']);
