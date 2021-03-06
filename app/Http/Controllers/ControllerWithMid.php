<?php
/**
 * Created by PhpStorm.
 * User: zyd
 * Date: 17-7-8
 * Time: 上午8:30
 */

namespace App\Http\Controllers;


class ControllerWithMid extends Controller
{
    public function __construct() //add middleware
    {
        $this->middleware('auth');
        $this->middleware('setLocale');
        $this->middleware('verify');
    }
}