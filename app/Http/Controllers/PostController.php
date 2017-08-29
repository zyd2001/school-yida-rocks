<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends ControllerWithMid
{
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['msg' => __()]);
    }
}
