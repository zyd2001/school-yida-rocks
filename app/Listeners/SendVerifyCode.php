<?php

namespace App\Listeners;

use App\Events\VerifyCodeGenerated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Mail\VerifyCode;

class SendVerifyCode implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  VerifyCodeGenerated $event
     * @return void
     */
    public function handle(VerifyCodeGenerated $event)
    {
        \Mail::to($event->user->email)->send(new VerifyCode($event->user));
    }
}
