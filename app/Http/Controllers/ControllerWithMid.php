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
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('verify');
        $this->middleware('locale');
    }
}