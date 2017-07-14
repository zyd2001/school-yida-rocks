<?php

namespace App\Http\Controllers;

use App\Assignment;
use App\Course;
use App\Grade;
use Illuminate\Http\Request;
use KHerGe\JSON\JSON;

class AssignmentController extends ControllerWithMid
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
//        return view('assignment');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) // an ajax request
    {
        try
        {
            $this->checkContent($request->content);
            $id = Assignment::create([
                'name' => $request->name,
                'course_id' => $request->id,
                'content' => $request->content,
                ])->id;//add Assignment
            $users = Course::find($request->id)->users;
            foreach ($users as $user)
                Grade::create([
                    'user_id' => $user->id,
                    'course_id' => $request->id,
                    'assignment_id' => $id,
                    ]);
            return redirect('/assignments/'.$id)->with(['msg' => 'success']);
        }
        catch (\Exception $e)
        {
            return back()->with(['err' => $e->getMessage()]); //return the error message
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Assignment  $assignment
     * @return \Illuminate\Http\Response
     */
    public function show(Assignment $assignment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Assignment  $assignment
     * @return \Illuminate\Http\Response
     */
    public function edit(Assignment $assignment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Assignment  $assignment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Assignment $assignment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Assignment  $assignment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Assignment $assignment)
    {
        //
    }

    private function checkContent($content)
    {
        $json = new JSON();
        try
        {
            $decoded = $json->decode($content);
            $std = $json->decodeFile(env('ASSIGNMENT_JSON_SCHEMA', 'http://orjf65xeb.bkt.clouddn.com/json_schema'));// get the standard assignment json schema
            $json->validate($std, $decoded);
            return 1;
        }
        catch (\Exception $e)
        {
            throw $e;
        }
    }
}
