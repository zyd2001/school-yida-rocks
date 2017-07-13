<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'verifyCode',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'verifyCode',
    ];

    public function files()
    {
        return $this->hasMany('App\File');
    }

    public function courses()
    {
        return $this->belongsToMany('App\Course');
    }

    public function grades()
    {
        return $this->hasMany('App\Grade');
    }

    public function assignments()
    {
        return $this->belongsToMany('App\Assignment', 'grades');
    }

    public function getAssignments()
    {

    }

    public function getGrades()
    {
        $grades = $this->grades;
        $results = new \stdClass();
        foreach ($grades as $item)//omit all the unnecessary info
        {
            $result = new \stdClass();
            $assignment = $item->assignment;
            $result->name = $assignment->name;
            $result->class_info = $assignment->course->info();
            $result->score = $item->score();
            $results->{$item->id} = $result;
        }
        return $results;
    }

    public function getCourses()
    {
        $this->courses->where('type', 0)->pluck('avatar', 'name');
    }

}
