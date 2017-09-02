@extends('layouts.app')
@section('content')
    @yield('course')
@endsection

@section('script')
    @parent
    <script src="{{ asset('js/course.js') }}"></script>
@endsection

{{--@section('head')--}}
    {{--@parent--}}
    {{--<meta name="id" content="{{ $course->id }}">--}}
{{--@endsection--}}