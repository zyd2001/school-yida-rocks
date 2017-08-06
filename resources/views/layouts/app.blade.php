<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    @if(config('app.env') == 'production')
        <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet">
    @else
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @endif
    <style type="text/css">
        html, body {
            height: 100%;
        }

        .container {
            height: 100%;
        }

        footer {
            padding: 1rem 0;
            color: #999;
            text-align: center;
            background-color: #EEEEEE;
            border-top: .05rem solid #e5e5e5;
        }

        .hidden {
            display: none;
        }
    </style>
</head>
<body>
<div id="app">
    @include('layouts.header')
    @include('layouts.message')
    <br/>
    <div class="container">
        @yield('content')
    </div>
    @include('layouts.footer')
</div>
@if(config('app.env') == 'production')
    <script src="https://cdn.bootcss.com/vue/2.4.2/vue.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.slim.min.js"></script>
    <script src="https://cdn.bootcss.com/tether/1.4.0/js/tether.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
    <script src="{{ asset('js/production.js') }}"></script>
@else
    <script src="{{ asset('js/app.js') }}"></script>
@endif
<script>
    $('#coursesLink').css('cursor', 'default');
</script>
<script>
    if ({{$errors->has('code')}})
        $('#joinModal').modal('show');
</script>
</body>
</html>
