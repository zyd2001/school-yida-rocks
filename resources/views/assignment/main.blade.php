@extends('layouts.app')
@section('content')
    <div id="assignment">
        <div class="assignment_description">
            @include('assignment.description')
        </div>
        <div class="assignment_content" style="display:none">
            @include('assignment.content')
        </div>
    </div>
@endsection

@section('script')
    @parent
    <script src="{{ asset('js/assignment.js') }}"></script>
    <script type="text/javascript">
        window.onbeforeunload = function () {
            return 'Are you sure you want to leave?';
        };
    </script>
@endsection

@section('head')
    @parent
    <meta name="id" content="{{ $assignment->id }}">
@endsection