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

    public function allCourses()
    {
        return Course::select('name', 'avatar', 'type')->where('public', '1')->get();
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
        try
        {
            $result = $course->getFiles();
            return response()->json($result);
        }
        catch (\Exception $e)
        {
            return response($e->getMessage(), 500);
        }
    }
}
