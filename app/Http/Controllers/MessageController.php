<?php

namespace App\Http\Controllers;

use App\Events\MessageChange;
use App\Message;
use Illuminate\Http\Request;

class MessageController extends ControllerWithMid
{
    public function index(Request $request)
    {

    }

    public function store(Request $request)
    {
        event(new MessageChange($request->to));
        $conversation = [];
        $reply = isset($request->reply) ? $request->reply : null;
        $message = Message::create([
            'user_id'      => auth()->id(),
            'to'           => $request->to,
            'reply'        => $reply,
            'read'         => false,
            'conversation' => '',
            'content'      => $request->content,
        ]);
        if ($reply)
        {
            $c = Message::where('id', $reply)->first()->conversation;
            $c = json_decode($c);
            array_push($c, $message->id);
            $json = json_encode($c);
            foreach ($c as $id)
            {
                $temp = Message::where('id', $id)->first();
                $temp->conversation = $json;
                $temp->save();
            }
        }
        else
        {
            array_push($conversation, $message->id);
            $message->conversation = json_encode($conversation);
            $message->save();
        }
    }

    public function create()
    {
        return view('home.message.create');
    }

    public function show()
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
