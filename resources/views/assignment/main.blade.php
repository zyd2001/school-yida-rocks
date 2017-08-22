@extends('layouts.app')
@section('content')
    <div id="assignment">
        <div id="assignment_description">
            @include('assignment.description')
        </div>
        <div id="assignment_content" style="display:none">
            @include('assignment.content')
        </div>
        <div id="assignment_grade" style="display:none">
            @include('assignment.grade')
        </div>
    </div>
@endsection

@section('script')
    @parent
    <script src="{{ asset('js/assignment.js') }}"></script>
    <script type="text/javascript">
        //        window.onbeforeunload = function () {
        //            return 'Are you sure you want to leave?';
        //        };
    </script>
@endsection

@section('head')
    @parent
    <meta name="id" content="{{ $assignment->id }}">
    @if (isset($assignment->setting))
        <meta name="setting" content="{{ $assignment->setting }}">
    @endif
    <meta name="status" content="{{ $grade->done }}">
@endsection