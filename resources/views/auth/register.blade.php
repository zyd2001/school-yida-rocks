@extends('layouts.app')
@section('content')
    <div class="row">
        <div class="card mx-auto">
            <h5 class="card-header">Register</h5>
            <div class="card-body">
                <form class="form-horizontal" method="POST" action="{{ route('register') }}">
                    {{ csrf_field() }}
                    <div class="form-group">
                        <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}"
                               placeholder="Name" required autofocus>
                        @include('layouts.error', ['type' => 'name'])
                    </div>

                    <div class="form-group">
                        <input id="email" type="email" class="form-control" name="email"
                               value="{{ old('email') }}" placeholder="Email" required>
                        @include('layouts.error', ['type' => 'email'])
                    </div>

                    <div class="form-group">
                        <input id="password" type="password" class="form-control" name="password"
                               placeholder="Password" required>
                        @include('layouts.error', ['type' => 'password'])
                    </div>

                    <div class="form-group">
                        <input id="password-confirm" type="password" class="form-control"
                               name="password_confirmation" placeholder="Confirm Password" required>
                    </div>

                    <div class="form-group row">
                        <input type="submit" class="btn btn-primary mx-auto w-50" value="Register">
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
{{--</div>--}}
{{--</body>--}}
{{--</html>--}}
