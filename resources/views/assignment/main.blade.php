@extends('layouts.app')
@section('content')
    @include('assignment.content')
    @include('assignment.description')
@endsection

@section('script')
    @parent
    <script src="{{ asset('js/assignment.js') }}"></script>
@endsection

@section('head')
    @parent
    <meta name="id" content="{{ $assignment->id }}">
@endsection