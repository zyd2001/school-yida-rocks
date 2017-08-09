@extends('layouts.app')
@section('content')
@endsection

@section('script')
    @parent
    <script></script>
@endsection

@section('head')
    @parent
    <meta name="id" content="{{ $assignment->id }}">
@endsection