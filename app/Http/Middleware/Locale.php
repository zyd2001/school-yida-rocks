<?php

namespace App\Http\Middleware;

use Closure;

class Locale
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
        $setting = json_decode(auth()->user()->setting);
        if ($setting) // skip if setting doesn't exist
        {
            $locale = $setting->locale;
            \App::setLocale($locale);
        }
        return $next($request);
    }
}
