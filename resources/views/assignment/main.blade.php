@extends('layouts.app')
@section('content')
    @yield('assignment')
@endsection

@section('script')
    @parent
    <script src="{{ asset('js/assignment.js') }}"></script>
@endsection