<?php

namespace App\Http\Middleware;

use Closure;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (session()->has('locale'))
            \App::setLocale(session('locale'));
        else if (!session()->exists('locale'))
        {
            $setting = json_decode(auth()->user()->setting);
            if (!json_last_error()) // skip if setting doesn't exist
                session(['locale' => $setting->locale]);
            else
                session(['locale' => null]);
        }
        return $next($request);
    }
}
