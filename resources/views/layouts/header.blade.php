<div class="navbar navbar-toggleable-md navbar-light bg-faded">
    <nav class="container">
        <div class="d-flex justify-content-between">
            <a class="navbar-brand" href="/">
                {{ config('app.name') }}
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
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
                            <a v-for="course in courses" v-if="status === 1" class="dropdown-item h5"
                               v-bind:href="'/courses/' + course.id"><img
                                        v-bind:src="course.avatar" v-bind:alt="course.name">&nbsp;@{{ course.name }}</a>
                            <a v-if="status === 2" class="dropdown-item h5">Loading...</a>
                            <a v-if="status === 3" class="dropdown-item" data-toggle="modal"
                               data-target="#joinModal" href="#">No Courses, join one</a>
                            <a v-if="status === 4" class="dropdown-item h5">Error</a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item font-weight-bold" data-toggle="modal"
                               data-target="#joinModal">Join A New Course</a>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    @if (auth()->check())
                        <li class="nav-item dropdown">
                            <a href="#" class="navbar-brand dropdown-toggle" id="dropdownUser"
                               data-toggle="dropdown" aria-haspopup="true"
                               aria-expanded="true">{{ auth()->user()->name }}</a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownUser">
                                <form action="{{ route('logout') }}" method="post" id="logout-form">
                                    {{ csrf_field() }}
                                </form>
                                <a href="{{ route('logout') }}" class="dropdown-item"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    Logout
                                </a>
                            </div>
                        </li>
                    @endif
                </ul>
            </div>
        @endif
    </nav>
</div>
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
                        onclick="event.preventDefault(); document.getElementById('join-form').submit()"
                        class="btn btn-primary">Submit
                </button>
            </div>
        </div>
    </div>
</div>