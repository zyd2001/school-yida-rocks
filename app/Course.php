<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public function file()
    {
        $fs = $this->fileStructure;
        $fs = json_decode($fs);
    }
}
