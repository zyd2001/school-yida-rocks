@extends('assignment.main')
@section('assignment')
    <div id="assignment_create">
        <div id="editor_test"></div>
        <form action="/courses/{{ $course->id }}/assignments" method="post">
            {{ csrf_field() }}
            <input type="hidden" name="questions">
            <input type="hidden" name="correct">
            <input type="hidden" name="setting">
            <input type="hidden" name="dueTime">
        </form>
    </div>
@endsection