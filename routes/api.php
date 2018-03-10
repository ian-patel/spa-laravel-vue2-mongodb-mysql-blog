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

Route::get('posts', 'PostController@list');
Route::get('posts/{id}', 'PostController@show');
Route::put('posts/click', 'PostController@click');

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
