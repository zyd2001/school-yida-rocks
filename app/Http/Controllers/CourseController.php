<?php

namespace App\Http\Controllers;

use App\Course;
use App\Events\CoursesChange;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\MessageBag;

class CourseController extends ControllerWithMid
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $courses = Course::where('public', '1')->get();
        return view('course.list', compact('courses'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('course.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id = Course::create([
            'name'       => $request->name,
            'public'     => $request->public,
            'avatar'     => $request->avatar,
            'accessCode' => strtoupper(bin2hex(random_bytes(3))),
            'setting'    => $request->setting,
        ])->id;
        return redirect('/courses/' . $id)->with(['msg' => __()]);
    }

    public function join(Request $request)
    {
        $this->validate($request, [
            'code' => 'required|size:6',
        ]);
        $course = Course::where('accessCode', strtoupper($request->code))->first();
        if (!$course)
            return back()->with(['err' => __('No such course')]);
        $status = $course->users()->syncWithoutDetaching([auth()->user()->id => ['type' => 0]]);
        event(new CoursesChange());
        if (isset($status['attached'][0]))
            return redirect('/courses/' . $course->id);
        return back()->with(['err' => __('Failed, maybe you have already joined this course')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Course $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        return view('course.main', compact('course'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Course $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Course $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Course $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        //
    }
}
