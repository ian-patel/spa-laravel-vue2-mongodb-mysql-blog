<?php

use Illuminate\Http\Request;

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

// Posts
Route::group(['prefix' => 'posts'], function () {
    Route::get('/', 'PostController@list');
    Route::get('/{id}', 'PostController@show');
    Route::put('/click', 'PostController@click');
    Route::delete('/{id}', 'PostController@destroy')->middleware('auth:api');
    Route::put('/edit/{id}', 'PostController@update')->middleware('auth:api');
    Route::post('/store', 'PostController@store')->middleware('auth:api');
});

// Categories
Route::group(['prefix' => 'categories'], function () {
    Route::get('/', 'CategoryController@list');
    Route::get('/{id}', 'CategoryController@show');
    Route::delete('/{id}', 'CategoryController@destroy')->middleware('auth:api');
});

// Users
Route::group(['prefix' => 'users'], function () {
    Route::get('/', 'UserController@list');
    Route::get('/{id}', 'UserController@show');
    Route::delete('/{id}', 'UserController@destroy')->middleware('auth:api');
});
