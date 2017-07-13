<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use KHerGe\JSON\JSON;

class Course extends Model
{

    protected $fillable = ['name']; //allow to use App\Course::create()

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

    public function getFiles()
    {
        $json = new JSON();
        $files = $this->files;
        try
        {
            $fileStructure = $json->decode($this->fileStructure);
            return [];//not completed, return an array
        }
        catch (\Exception $e)
        {
            throw $e;
        }
    }

    public function info()// return basic info of a course
    {
        $info = new \stdClass();
        $info->id = $this->id;
        $info->name = $this->name;
        $info->avatar = $this->avatar;
        return $info;
    }
}
