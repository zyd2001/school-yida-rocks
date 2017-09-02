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

Route::get('/test', function (){
   return view('test');
});

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/verify', 'HomeController@verify');
Route::get('/home/setting', 'HomeController@showSetting');
Route::post('/home/setting/resetPassword', 'HomeController@resetPassword');
Route::get('/verify', function () {
    if (session('isVerified'))
        return back()->with(['err' => __('You have already verified')]);
    else
        return response()->view('home.verify', [], 403);
});

Route::get('/courses/{course}/assignments/create', 'AssignmentController@create')->where('course', '[0-9]+');
Route::post('/courses/{course}/assignments', 'AssignmentController@store')->where('course', '[0-9]+');

Route::post('/assignments/{assignment}/submit', 'GradeController@store')->where('id', '[0-9]+');

Route::post('/courses/join', 'CourseController@join');

Route::get('/setLocale', 'ApiController@locale');
Route::get('/courses/{course}/files', 'ApiController@getFiles')->where('course', '[0-9]+');
Route::get('/courses/getCourses', 'ApiController@getCourses');
Route::get('/courses/{course}/assignments', 'ApiController@getAssignmentsInCourse')->where('course', '[0-9]+');
Route::get('/assignments/{assignment}/questions', 'ApiController@getAssignmentQuestions')->where('assignment', '[0-9]+');
Route::get('/assignments/{assignment}/grade', 'ApiController@getAssignmentGrade')->where('assignment', '[0-9]+');
Route::post('/assignments/{assignment}/save', 'ApiController@saveAssignmentAnswer')->where('assignment', '[0-9]+');
Route::get('/assignments/{assignment}/save', 'ApiController@getSavedAssignmentAnswer')->where('assignment', '[0-9]+');
Route::get('/assignments', 'ApiController@getAssignments');
Route::get('/grades', 'ApiController@getGrades');
Route::get('/messages/amount', 'ApiController@getMessageAmount');

Route::resource('messages', 'MessageController');
Route::resource('assignments', 'AssignmentController', ['except' => ['index', 'create', 'store']]);
Route::resource('courses', 'CourseController');// return view
Route::resource('files', 'FileController');// return view