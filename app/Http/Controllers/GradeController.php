<?php

namespace App\Http\Controllers;

use App\Grade;
use Illuminate\Http\Request;

class GradeController extends ControllerWithMid
{

    public function store(Request $request, \App\Assignment $assignment)
    {
        $temp = $assignment->grades->where('user_id', auth()->user()->id)->first();
        $msg = 'Success';
        $setting = json_decode($assignment->setting);
        if (!json_last_error())
        {
            if (!$setting->open)
            {
                $msg = 'The assignment is closed';
                return back()->with(['err' => __($msg)]);
            }
            if ($temp->attempt >= $setting->attempt)
            {
                $msg = 'You exceed the attempt limit';
                return back()->with(['err' => __($msg)]);
            }
        }
        $answer = json_decode($request->answer, true);
        $grade = $this->check($answer, $assignment); //grade the post
        $temp->total = $grade['total'];
        $temp->raw = $grade['raw'];
        $temp->percent = $grade['percent'];
        $temp->answer = $request->answer;
        $temp->status = 1;
        $temp->attempt++;
        $temp->save();
        return redirect('/assignments/' . $assignment->id)->with(['msg' => __($msg)]);
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();
        return response()->json(['msg' => __()]);
    }

    private function check(array $answer, \App\Assignment $assignment) //compare with the correct answer
    {   
        $count = 0;
        $questions = json_decode($assignment->questions, true);
        $correct = json_decode($assignment->correct, true);

        foreach ($questions as $key => $question)
        {
            switch ($question['type'])
            {
                case 'multiple_choice':
                    if (count(array_diff($answer[$key], $correct[$key])) === 0)
                        $count++;
                    break;
                case 'fill_in_the_blank':
                    if (count(array_diff($answer[$key], $correct[$key])) === 0)
                        $count++;
                    break;
                case 'matching':
                case 'short_answer':
            }
        }

        $total = count($questions);
        return [
            'total'   => $total,
            'raw'     => $count,
            'percent' => $count / $total * 100,
        ];
    }
}
