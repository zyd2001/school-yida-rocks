@extends('layouts.app')
@section('content')
    @yield('home')
@endsection

@section('script')
    @parent
    <script src="{{ asset('js/home.js') }}"></script>
@endsection