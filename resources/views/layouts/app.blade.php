<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    @section('head')
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        @if(auth()->check())
            <meta name="user_id" content="{{ auth()->id() }}">
        @endif

        <title>{{ config('app.name', 'School') }}</title>

        <!-- Styles -->
        @if(config('app.env') == 'production')
            <link href="https://cdn.bootcss.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
            <link rel="stylesheet" href="{{ asset('css/main.css') }}">
        @else
            <link href="{{ asset('css/app.css') }}" rel="stylesheet">
            <link rel="stylesheet" href="{{ asset('css/main.css') }}">
        @endif
        <script src="https://cdn.bootcss.com/socket.io/2.0.3/socket.io.js"></script>
    @show
</head>
<body>
<div id="app">
    <div id="header">
        @include('layouts.header')
    </div>
    @include('layouts.message')
    <br/>
    <div class="container">
        @yield('content')
    </div>
    <br>
    @include('layouts.footer')
</div>
@section('script')
    @if(config('app.env') == 'production')
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/popper.js/1.11.1/umd/popper.min.js"></script>
        <script src="https://cdn.bootcss.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
        <script src="https://cdn.bootcss.com/axios/0.16.2/axios.min.js"></script>
        <script src="https://cdn.bootcss.com/vue/2.4.2/vue.min.js"></script>
        {{--<script src="https://cdn.bootcss.com/pusher/4.1.0/pusher.min.js"></script>--}}
        <script src="{{ asset('js/dependency.js') }}"></script>
        <script src="{{ asset('js/global.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
    @else
        <script src="{{ asset('js/localDependency.js') }}"></script>
        <script src="{{ asset('js/dependency.js') }}"></script>
        <script src="{{ asset('js/global.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
    @endif
@show
<script>
    if ({{$errors->has('code') ? 'true' : 'false'}})
        $('#joinModal').modal('show');
</script>
</body>
</html>
