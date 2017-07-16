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
Route::get('/verify', function ()
{
    return view('verify');
});

Route::post('/assignments/{assignment}', 'GradeController@store');

Route::get('/courses/{course}/getFiles', 'ApiController@getFiles');
Route::get('/courses/getCourses', 'ApiController@getCourses');
Route::get('/assignments', 'ApiController@getAssignments');
Route::get('/grades', 'ApiController@getGrades');

Route::resource('courses', 'CourseController');// return view

Route::resource('files', 'FileController');// return view