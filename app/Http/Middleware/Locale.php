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
        $locale = json_decode(auth()->user()->setting)->locale;
        if ($locale)
            \App::setLocale($locale);
        return $next($request);
    }
}
