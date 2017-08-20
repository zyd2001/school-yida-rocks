<?php

namespace App\Http\Controllers;

use App\Grade;
use Illuminate\Http\Request;

class GradeController extends ControllerWithMid
{

    public function store(Request $request, \App\Assignment $assignment)
    {
        $correct = json_decode($assignment->content, true); //decode the assignment content, correct answer
        $answer = json_decode($request->answer);
        $grade = $this->check($answer, $correct, 0); //grade the post
        $temp = Grade::where([['user_id', auth()->user()->id], ['assignment_id', $assignment->id]])->first();
        $temp->total = $grade['total'];
        $temp->raw = $grade['raw'];
        $temp->percent = $grade['percent'];
        $temp->save();
        $assignment->done = true;
        $assignment->save();
        return redirect('/assignments/' . $assignment->id)->with(['msg' => __()]);
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();
        return response()->json(['msg' => __()]);
    }

    private function check(array $answer, array $correct, $type) //compare with the correct answer
    {   //type: 0 => strict
        $count = 0;
        switch ($type)
        {
            case 0:
                foreach ($correct as $key => $value)
                {
                    if ($value['correct'] == $answer[$key])
                    {
                        $count++;
                    }
                }
                break;
        }

        $total = count($correct);
        return [
            'total'   => $total,
            'raw'     => $count,
            'percent' => $count / $total * 100,
        ];
    }
}
