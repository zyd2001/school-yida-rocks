<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends ControllerWithMid
{
    public function index(Request $request)
    {

    }

//    public function conversation()
//    {
//        $user = auth()->user();
//        $messages = $user->messages;
//        $messages->merge($user->receivedMessages);
//        $conversations = [];
//        foreach ($messages as $message)
//        {
//            if (!$message->reply)
//                array_push($conversations, collect($message));
//            else
//            {
//                foreach ($conversations as $conversation)
//                {
//                    $result = $conversation->where('id', $message->reply)->first();
//                    if ($result)
//                        $conversation->push($message);
//                }
//            }
//        }
//        return $conversations;
//    }
}
