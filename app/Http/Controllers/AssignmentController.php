<?php

namespace App\Http\Controllers;

use App\Assignment;
use Illuminate\Http\Request;
use KHerGe\JSON\JSON;
use Mockery\Exception;

class AssignmentController extends ControllerWithMid
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('assignment');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) // an ajax request
    {
        $result = $this->checkContent($request->content);
        if ($result == 1)
        {
            Assignment::create([
                'name' => $request->name,
                'course_id' => $request->id,
                'content' => $request->content,
            ]);//add Assignment
            return redirect('/home')->with(['msg' => 'success']);
        }
        else
        {
            return redirect('/home')->with(['err' => $result->getMessage()]); //return the error message
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
        $decoded = $json->decode($content);
        $std = $json->decodeFile('http://orjf65xeb.bkt.clouddn.com/json_schema');
        try
        {
            $json->validate($std, $decoded);
            return 1;
        }
        catch (Exception $e)
        {
            return $e;
        }
    }
}
