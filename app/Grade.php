<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{

    protected $fillable = ['user_id', 'course_id', 'assignment_id'];

    public function assignment()
    {
        return $this->belongsTo('App\Assignment');
    }
}
