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
            if (isset($setting->open))
            {
                if (!$setting->open)
                {
                    $msg = 'The assignment is closed';
                    return back()->with(['err' => __($msg)]);
                }
            }
            if (isset($setting->attempt))
                if ($temp->attempt >= $setting->attempt)
                {
                    $msg = 'You exceed the attempt limit';
                    return back()->with(['err' => __($msg)]);
                }
        }
        $correct = json_decode($assignment->correct, true); //decode the assignment content, correct answer
        $answer = json_decode($request->answer, true);
        $grade = $this->check($answer, $correct, 0); //grade the post
        $temp->total = $grade['total'];
        $temp->raw = $grade['raw'];
        $temp->percent = $grade['percent'];
        $temp->answer = $request->answer;
        $temp->done = 1;
        $temp->attempt++;
        $temp->save();
        return redirect('/assignments/' . $assignment->id)->with(['msg' => __($msg)]);
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
                    if ($value == $answer[$key])
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
