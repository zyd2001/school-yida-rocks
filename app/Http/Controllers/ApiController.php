<?php

namespace App\Http\Controllers;

use App\Course;
use Illuminate\Http\Request;

class ApiController extends ControllerWithMid
{
    public function getCourses()
    {
        return auth()->user()->getCourses();
    }

    public function getAssignments()
    {
        return auth()->user()->getAssignments();
    }

    public function getGrades()
    {
        return auth()->user()->getGrades();//return a json string that contains grades and related class info
    }

    public function getFiles(Course $course)
    {
        return response()->json($course->fileStructure);
    }

    public function getAssignmentsInCourse(Course $course)
    {
        return $course->assignments()->select('id', 'name', 'done', 'dueTime')->get();
    }

    public function locale(Request $request)
    {
        session(['locale' => $request->locale]);
        if (auth()->check())
        {
            $setting = json_decode(auth()->user()->setting);
            $setting->locale = $request->locale;
            auth()->user()->setting = json_encode($setting);
            auth()->user()->save();
        }
        return back()->with(['msg' => trans('message.changeLocaleSuccess')]);
    }
}
