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

Route::get('/files/{course}', 'ApiController@getFiles');
Route::get('/courses/getCourses', 'ApiController@getCourses');
Route::get('/assignments/getAssignments', 'ApiController@getAssignments');
Route::get('/courses/allCourses', 'ApiController@allCourses');
Route::get('/grades/getGrades', 'ApiController@getGrades');

Route::resource('grades', 'GradeController');

Route::resource('courses', 'CourseController');

Route::resource('files', 'FileController');