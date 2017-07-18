<?php

namespace App\Http\Middleware;

use Closure;

class VerifyUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (session('isVerified'))
            return $next($request);
        else if (!session()->has('isVerified'))
        {
            if (auth()->user()->isVerified)
            {
                session(['isVerified' => true]);
                return $next($request);
            }
            else
            {
                session(['isVerified' => false]);
                return response()->view('verify', [], 403);
            }
        }
        else
            return response()->view('verify', [], 403);
    }
}
