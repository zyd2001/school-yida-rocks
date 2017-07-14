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

    public function getGrades()
    {
        $grades =  $this->grades()->select('assignment_id', 'course_id', 'total', 'raw', 'percent', 'grade')->get();
        foreach ($grades as $grade)
        {
            $grade['course'] = Course::where('id', $grade['course_id'])->select('name', 'avatar')->get();
            $grade['assignment'] = Assignment::where('id', $grade['assignment_id'])->select('name')->get();
        }
        return $grades;
    }

    public function getCourses()
    {
        $this->courses->where('type', 0)->pluck('avatar', 'name');
    }

}
