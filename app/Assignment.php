<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    public function course()
    {
        return $this->belongsTo('App\Course');
    }
}
