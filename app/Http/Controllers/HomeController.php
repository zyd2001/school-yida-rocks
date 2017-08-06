<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('setLocale');
        $this->middleware('verify')->except('verify');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function locale(Request $request)
    {
        session(['locale' => $request->locale]);
        return back()->with(['msg' => trans('message.changeLocaleSuccess')]);
    }

    public function verify(Request $request)
    {
        if (strtoupper($request->code) == auth()->user()->verifyCode) //expire => 60 minutes
        {
            if (auth()->user()->updated_at->diffInMinutes(Carbon::now()) <= 60)
            {
                auth()->user()->isVerified = true;
                auth()->user()->save();
                session(['isVerified' => true]);
                return redirect('/home');
            }
            else
            {
                return back()->with(['err' => __('your verify code is expired')]);
            }
        }
        else
        {
            return back()->with(['err' => trans('message.wrong_verify_code')]);
        }
    }//too complex, but I don't want to change it
}
