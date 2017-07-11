<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{

    protected $fillable = ['name']; //allow to use App\Course::create()

//    public function file()
//    {
//        $fs = $this->fileStructure;
//        $fs = json_decode($fs);
//    }
    public function info()// return basic info of a course
    {
        $info = new \stdClass();
        $info->id = $this->id;
        $info->name = $this->name;
        $info->avatar = $this->avatar;
        return $info;
    }
}
