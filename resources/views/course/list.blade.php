@extends('layouts.app')
@section('content')
    <ul>
        @foreach ($courses as $course)
            <li>{{ dump($course) }}</li>
        @endforeach
    </ul>
@endsection