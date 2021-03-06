<?php

namespace App\Http\Controllers;

use App\Events\VerifyCodeGenerated;
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
        return view('home.home');
    }

    public function resetPassword(Request $request)
    {
        $user = auth()->user();
        $user->forceFill([
            'password' => bcrypt($request->password),
        ])->save();
        return response()->json(['msg' => ['content' => __(), 'type' => 1]]);
    }

    public function showSetting()
    {
        return view('home.setting');
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        foreach ($request->all() as $key => $value)
        {
            if ($key == 'setting')
            {
                $setting = json_decode($user->setting);
                $new = json_decode($request->setting);
                foreach ($new as $i => $item)
                    $setting->$i = $new->$i;
                $user->setting = json_encode($setting);
            }
            else
                $user->$key = $request->$key;
        }
        $user->save();
        return response()->json(['msg' => ['content' => __(), 'type' => 1]]);
    }

    public function verify(Request $request)
    {
        if ($request->re)
        {
            $user = auth()->user();
            $user->verifyCode = strtoupper(bin2hex(random_bytes(3)));
            $user->save();
            event(new VerifyCodeGenerated($user));
//            \Mail::to($user->email)->send(new \App\Mail\VerifyCode($user));
            return response()->json(['msg' => ['content' => __('success'), 'type' => 1]]);
        }
        else
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
                return back()->with(['err' => __('message.wrong_verify_code')]);
            }
        }//too complex, but I don't want to change it
    }
}
