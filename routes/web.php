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
Route::post('/verify', 'HomeController@verify');
Route::get('/verify', function ()
{
    return view('verify');
});

Route::post('/assignments/{assignment}', 'GradeController@store');

Route::resource('assignments', 'AssignmentController');

Route::get('/setLocale', 'ApiController@locale');
Route::get('/courses/{course}/files', 'ApiController@getFiles');
Route::get('/courses/getCourses', 'ApiController@getCourses');
Route::get('/assignments/{assignment}/content', 'ApiController@getAssignmentContent');
Route::get('/assignments', 'ApiController@getAssignments');
Route::get('/grades', 'ApiController@getGrades');
Route::get('/courses/{course}/assignments', 'ApiController@getAssignmentsInCourse');

Route::resource('courses', 'CourseController');// return view
Route::post('/courses/join', 'CourseController@join');

Route::resource('files', 'FileController');// return view