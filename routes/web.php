<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/setLocale', 'HomeController@locale');
Route::post('/verify', 'HomeController@verify');
Route::post('/assignments/{assignment}', 'GradeController@store');
Route::resource('courses', 'CourseController');
Route::get('/grades', 'GradeController@index');
Route::get('/files/{course}', 'FileController@index');
Route::resource('files', 'FileController');