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
            session(['locale' => null]);
        return $next($request);
    }
}
