<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth()->user()->isVerified)
            return view('home');
        else
            return view('verify');
    }

    public function verify(Request $request)
    {
        if ($request->code == auth()->user()->verifyCode && auth()->user()->updated_at->diffInMinutes(Carbon::now()) <= 60) //expire => 60 minutes
        {
            auth()->user()->isVerified = true;
            auth()->user()->save();
        }
        else
        {

        }
    }
}
