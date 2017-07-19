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
                        <div class="dropdown-menu" aria-labelledby="dropdownCourse">
                            <div v-html="courses"></div>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item font-weight-bold" data-toggle="modal" data-target="#joinModal">Join A New Course</a>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    @if (auth()->check())
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle font-weight-bold" id="dropdownUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{{ auth()->user()->name }}</a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownUser">
                                <a href="#" class="dropdown-item">a</a>
                            </div>
                        </li>
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
    <!-- Modal -->
    <div class="modal fade" id="joinModal" tabindex="-1" role="dialog" aria-labelledby="joinModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="joinModalLabel">Join A New Course</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="/courses/join" method="post" id="join-form">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="access-code" class="form-control-label">Access Code</label>
                            <input type="text" class="form-control" name="code" required>
                            @include ('layouts.error')
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <a type="button" class="btn btn-secondary mr-auto" href="/courses" id="coursesLink">All Courses</a>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onclick="event.preventDefault(); document.getElementById('join-form').submit()" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
    @include ('layouts.message')
    @yield ('content')
</div>
    <!-- Scripts -->
    {{--<script src="https://unpkg.com/vue"></script>--}}
    {{--<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>--}}
    {{--<script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.slim.min.js"></script>--}}
    {{--<script src="https://cdn.bootcss.com/tether/1.4.0/js/tether.min.js"></script>--}}
    {{--<script src="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>--}}
    <script src="{{ asset('js/app.js') }}"></script>
<script>
    $('#coursesLink').css('cursor', 'default');
    if ({{$errors->has('code')}})
        $('#joinModal').modal('show');
</script>
</body>
</html>
