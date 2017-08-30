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

    public function getAssignmentQuestions(Assignment $assignment)
    {
        return $this->jsonResponse($assignment->questions);
    }

    public function getAssignmentGrade(Assignment $assignment)
    {
        $grade = $assignment->grades->where('user_id', auth()->user()->id)->first();
        if ($grade->status == 1)
        {
            $correct = $assignment->correct;
            $response = compact('grade', 'correct');
            return $this->jsonResponse($response);
        }
        else
            return response()->json(['msg' => ['content' => __('You must complete the assignment first'), 'type' => 0]]);
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
        return back()->with(['msg' => __('message.changeLocaleSuccess')]);
    }

    public function saveAssignmentAnswer(Request $request, Assignment $assignment)
    {
        $grade = $assignment->grades->where('user_id', auth()->user()->id)->first();
        $grade->answer = $request->answer;
        $grade->status = 2;
        $grade->save();
        return response()->json(['msg' => ['content' => 'Upload successfully', 'type' => 1]]);
    }

    public function getSavedAssignmentAnswer(Assignment $assignment)
    {
        $grade = $assignment->grades->where('user_id', auth()->user()->id)->first();
        return $this->jsonResponse($grade->answer);
    }

    public function getMessageAmount()
    {
        $amount = auth()->user()->receivedMessages->where('read', false)->count();
        return response()->json(['amount' => $amount]);
    }

    public function jsonResponse($data)
    {
        if (is_array($data))
            $data = json_encode($data);
        return response($data)->header('Content-Type', 'application/json');
    }
}
