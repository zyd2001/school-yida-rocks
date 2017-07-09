<?php

namespace App\Http\Controllers;

use App\Grade;
use Illuminate\Http\Request;

class GradeController extends ControllerWithMid
{
    public function store(Request $request, \App\Assignment $assignment)
    {
        $c = json_decode($assignment->content); //decode the assignment content, correct answer
        $a = json_decode($request->answer);
        $grade = $this->check($a, $c, 0); //grade the post
        return Grade::create([
            'user_id' => $request->user()->id,
            'assignment_id' => $assignment->id,
            $grade,
        ]);
    }

    private function check(array $a, array $c, $type) //compare with the correct answer
    {   //type: 0 => strict
        $count = 0;
        switch ($type)
        {
            case 0:
                foreach ($c as $key => $value)
                {
                    if ($value->correct == $a[$key])
                    {
                        $count++;
                    }
                }
                break;
        }

        $total = count($c);
        return array([
            'total' => $total,
            'raw' => $count,
            'percent' => $count / $total * 100,
            ]);
    }
}
