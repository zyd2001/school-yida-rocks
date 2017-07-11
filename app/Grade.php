<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    public function assignment()
    {
        return $this->belongsTo('App\Assignment');
    }

    public function score()
    {
        $score = new \stdClass();
        $score->total = $this->total;
        $score->raw = $this->row;
        $score->percent = $this->percent;
        $score->grade = $this->grade;
        return $score;//return all the score info in a grade model
    }
}
