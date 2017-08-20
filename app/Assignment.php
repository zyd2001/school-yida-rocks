<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{

    protected $guarded = [];

    public function course()
    {
        return $this->belongsTo('App\Course');
    }

    public function grades()
    {
        return $this->hasMany('App\Grade');
    }
}
