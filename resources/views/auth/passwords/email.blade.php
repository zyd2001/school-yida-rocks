@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="card mx-auto">
                <div class="card-header">Retrieve Password</div>
                <div class="card-block">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form class="form-horizontal" method="POST" action="{{ route('password.email') }}">
                        {{ csrf_field() }}

                        <div class="form-group">
                                <input id="email" type="email" class="form-control" name="email"
                                       value="{{ old('email') }}" placeholder="E-Mail Address" required>
                               @include('layouts.error', ['type' => 'email'])
                        </div>

                        <div class="form-group">
                            <input type="submit" class="btn btn-primary form-control" value="Send Password Reset Link">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
