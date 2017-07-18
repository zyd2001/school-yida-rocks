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
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    {{--<link href="node_modules/bootstrap/dist/css/bootstrap.css" rel="stylesheet">--}}
</head>
<body>
<div id="app">
    <div class="navbar navbar-toggleable-md navbar-light bg-faded">
        <nav class="container">
            <div class="d-flex justify-content-between">
                <a class="navbar-brand" href="/">
                    School
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Home</a>
                    </li>
                    <li class="nav-item dropdown" id="course">
                        <a v-on:click="get" class="nav-link dropdown-toggle" href="#" id="dropdownCourse" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Courses
                        </a>
                        <div v-html="courses" class="dropdown-menu" aria-labelledby="dropdownCourse"></div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"></a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    @if (auth()->check())
                        <li class="nav-item">
                            <form action="{{ route('logout') }}" method="post" id="logout-form">
                                {{ csrf_field() }}
                            </form>
                            <a href="{{ route('logout') }}" class="nav-link"
                               onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                Logout
                            </a>
                        </li>
                    @endif
                </ul>
            </div>
        </nav>
    </div>
    @yield ('content')
</div>
    <!-- Scripts -->
    {{--<script src="https://unpkg.com/vue"></script>--}}
    {{--<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>--}}
    {{--<script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.slim.min.js"></script>--}}
    {{--<script src="https://cdn.bootcss.com/tether/1.4.0/js/tether.min.js"></script>--}}
    {{--<script src="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>--}}
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
