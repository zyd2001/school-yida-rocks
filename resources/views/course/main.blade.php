@extends('layouts.app')
@section('content')
@endsection

@section('script')
    @parent
@endsection

@section('head')
    @parent
    <meta name="id" content="{{ $course->id }}">
@endsection