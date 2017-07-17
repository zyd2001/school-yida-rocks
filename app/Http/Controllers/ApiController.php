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
}
