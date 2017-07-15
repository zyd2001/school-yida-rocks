<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends ControllerWithMid
{

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
        return back()->with(['msg' => 'message.changeLocaleSuccess']);
    }

    public function verify(Request $request)
    {
        if ($request->code == auth()->user()->verifyCode) //expire => 60 minutes
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
                return back()->with(['err' => 'your verify code is expired']);
            }
        }
        else
        {
            return back()->with(['err' => trans('message.wrong_verify_code')]);
        }
    }//too complex, but I don't want to change it
}
