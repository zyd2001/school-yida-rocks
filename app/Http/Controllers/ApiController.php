<?php

namespace App\Http\Controllers;

use App\Assignment;
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

    public function getAssignmentContent(Assignment $assignment)
    {
        $res = json_decode($assignment->content);
        foreach ($res as $item)
        {
            unset($item->correct);
        }
        $res = json_encode($res);
        return response()->json($res);
    }

    public function locale(Request $request)
    {
        session(['locale' => $request->locale]);
        if (auth()->check())
        {
            $user = auth()->user();
            if ($user->setting == null)
                $user->setting = "{}";
            $setting = json_decode($user->setting);
            $setting->locale = $request->locale;
            $user->setting = json_encode($setting);
            $user->save();
        }
        return back()->with(['msg' => trans('message.changeLocaleSuccess')]);
    }
}
