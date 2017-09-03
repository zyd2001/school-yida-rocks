<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{

    protected $guarded = []; //allow to use App\Course::create()

    public function assignments()
    {
        return $this->hasMany('App\Assignment');
    }

    public function grades()
    {
        return $this->hasMany('App\Grade');
    }

    public function files()
    {
        return $this->belongsToMany('App\File');
    }

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
