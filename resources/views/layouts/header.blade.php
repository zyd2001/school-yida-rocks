<nav class="navbar navbar-expand-md navbar-light bg-light w-100">
    <div class="container" id="nav">
        <a class="navbar-brand" href="/">
            {{ config('app.name') }}
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        @if (auth()->check())
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Home</a>
                    </li>
                    <li class="nav-item dropdown" id="course">
                        <a v-on:click="get" class="nav-link dropdown-toggle" href="#" id="dropdownCourse"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Courses
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownCourse">
                            <a v-if="!courses" class="dropdown-item h5"><i
                                        class="fa fa-spinner fa-pulse fa-1x fa-fw"></i> Loading...</a>
                            <a v-else-if="!courses.length" class="dropdown-item" data-toggle="modal"
                               data-target="#joinModal" href="#"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;No
                                Courses, join one</a>
                            <span v-else>
                                <a v-for="course in courses" class="dropdown-item h5"
                                   v-bind:href="'/courses/' + course.id"> <img
                                            v-bind:src="course.avatar" v-bind:alt="course.name">&nbsp;@{{
                                    course.name
                                    }}</a>
                            </span>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item font-weight-bold" data-toggle="modal"
                               data-target="#joinModal"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Join A New
                                Course</a>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a href="#" class="navbar-brand dropdown-toggle" id="dropdownUser"
                           data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="true"><img src="{{ auth()->user()->avatar }}" width="30"
                                                     height="30">&nbsp;{{ auth()->user()->name }}</a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownUser">
                            <a href="#" class="dropdown-item"><i class="fa fa-user fa-fw" aria-hidden="true"></i>&nbsp;Profile</a>
                            <a href="/home/setting" class="dropdown-item"><i class="fa fa-sliders fa-fw"
                                                                             aria-hidden="true"></i>&nbsp;Setting</a>
                            <div class="dropdown-divider"></div>

                            <form action="{{ route('logout') }}" method="post" id="logout-form">
                                {{ csrf_field() }}
                            </form>
                            <a href="{{ route('logout') }}" class="dropdown-item"
                               onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                <i class="fa fa-sign-out fa-fw" aria-hidden="true"></i>&nbsp;
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        @else
            <div class="ml-auto">
                <ul class="navbar-nav">
                    <li class="nav-item"><a href="/login" class="nav-link">Login</a></li>
                    <li class="nav-item"><a href="/register" class="nav-link">Register</a></li>
                </ul>
            </div>
        @endif
    </div>
</nav>
<!-- Modal -->
<div class="modal fade" id="joinModal" tabindex="-1" role="dialog" aria-labelledby="joinModalLabel"
     aria-hidden="true">
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
                        @if ($errors->has('code'))
                            <div class="alert alert-danger">
                                {{ $errors->first('code') }}
                            </div>
                        @endif
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary mr-auto" onclick="window.location.href='/courses'">
                    All Courses
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button"
                        onclick="event.preventDefault(); sessionStorage.removeItem('courses'); document.getElementById('join-form').submit()"
                        class="btn btn-primary">Submit
                </button>
            </div>
        </div>
    </div>
</div>