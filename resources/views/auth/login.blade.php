@extends('layouts.app')
@section('content')
    <div class="row">
        <div class="card mx-auto">
            <h5 class="card-header">Login</h5>
            <div class="card-block">
                <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                    {{ csrf_field() }}

                    <div class="form-group">
                        <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}"
                               placeholder="Email" required autofocus>
                        @include('layouts.error', ['type' => 'email'])
                    </div>

                    <div class="form-group">
                        <input id="password" type="password" class="form-control" name="password" placeholder="Password"
                               required>
                        @include('layouts.error', ['type' => 'password'])
                    </div>

                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember
                                Me
                            </label>
                        </div>
                    </div>

                    <div class="form-group row">
                        <input type="submit" class="btn btn-primary mx-auto w-50" value="Login">
                    </div>

                    <div class="form-group row">
                        <a href="{{ route('password.request') }}" class="mx-auto">
                            Forgot Your Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection