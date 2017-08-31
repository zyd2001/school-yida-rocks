@extends('assignment.main')
@section('assignment')
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
    <script type="text/javascript">
        //        window.onbeforeunload = function () {
        //            return 'Are you sure you want to leave?';
        //        };
    </script>
@endsection

@section('head')
    @parent
    <meta name="id" content="{{ $assignment->id }}">
    <meta name="setting" content="{{ $assignment->setting }}">
    <meta name="status" content="{{ $grade->status }}">
@endsection