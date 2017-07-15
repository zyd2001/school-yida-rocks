<?php

namespace App\Http\Controllers;

use App\Grade;
use Illuminate\Http\Request;

class GradeController extends ControllerWithMid
{

    public function index()
    {
    }

    public function store(Request $request, \App\Assignment $assignment)
    {
        $correct = json_decode($assignment->content); //decode the assignment content, correct answer
        $answer = json_decode($request->answer);
        $grade = $this->check($answer, $correct, 0); //grade the post
        $temp = Grade::where([['user_id', 1], ['assignment_id', 2]])->first();
        $temp['total'] = $grade['total'];
        $temp['raw'] = $grade['raw'];
        $temp['percent'] = $grade['percent'];
        $temp->save();
        return redirect('/assignments/' . $assignment->id)->with(['msg' => 'success']);
    }

    private function check(array $answer, array $correct, $type) //compare with the correct answer
    {   //type: 0 => strict
        $count = 0;
        switch ($type)
        {
            case 0:
                foreach ($correct as $key => $value)
                {
                    if ($value->correct == $answer[$key])
                    {
                        $count++;
                    }
                }
                break;
        }

        $total = count($correct);
        return array([
            'total' => $total,
            'raw' => $count,
            'percent' => $count / $total * 100,
            ]);
    }
}
