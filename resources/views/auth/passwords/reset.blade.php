@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="card mx-auto">
            <div class="card-header">Reset Password</div>

            <div class="card-block">
                @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @endif

                <form class="form-horizontal" method="POST" action="{{ route('password.request') }}">
                    {{ csrf_field() }}

                    <input type="hidden" name="token" value="{{ $token }}">

                    <div class="form-group">
                        <input id="email" type="email" class="form-control" name="email"
                               value="{{ $email or old('email') }}" placeholder="E-Mail Address" required autofocus>
                        @include('layouts.error', ['type' => 'email'])
                    </div>

                    <div class="form-group">
                        <input id="password" type="password" class="form-control" name="password" placeholder="Password" required>
                        @include('layouts.error', ['type' => 'password'])
                    </div>

                    <div class="form-group">
                        <input id="password-confirm" type="password" class="form-control"
                               name="password_confirmation" placeholder="Confirm Password" required>
                        @include('layouts.error', ['type' => 'password_confirmation'])
                    </div>

                    <div class="form-group">
                        <input type="submit" class="btn btn-primary form-control" value="Reset Password">
                    </div>
                </form>
            </div>
        </div>
@endsection
