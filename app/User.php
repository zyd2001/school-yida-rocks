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
        $assignments = $this->assignments()->select('assignments.id', 'assignments.name', 'assignments.course_id', 'assignments.dueTime')->where('assignments.done', false)->get();
        foreach ($assignments as $assignment)
        {
            $assignment->course = Course::where('id', $assignment['course_id'])->select('id', 'name', 'avatar')->first();
        }
        return $assignments;
    }

    public function getGrades()
    {
        $grades =  $this->grades()->select('assignment_id', 'course_id', 'total', 'raw', 'percent', 'grade')->get();
        foreach ($grades as $grade)
        {
            $grade->course = Course::where('id', $grade['course_id'])->select('name', 'avatar')->first();
            $grade->assignment = Assignment::where('id', $grade['assignment_id'])->select('name')->first();
        }
        return $grades;
    }

    public function getCourses()
    {
        return $this->courses()->select('courses.id', 'courses.avatar', 'courses.name')->get();
    }

}
