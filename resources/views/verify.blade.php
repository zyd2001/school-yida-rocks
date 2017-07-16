@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Verify</div>

                    <div class="panel-body">
                        <form action="/verify" class="form-horizontal" method="post">
                            {{ csrf_field() }}
                            <input type="text" class="form-controller" name="code">
                            <input type="submit" class="form-controller" value="验证">
                        </form>
                        @if (session()->has('err'))
                            <div class="alert alert-danger">
                                {{ session('err') }}
                            </div>
                        @endif
                        {{ dump(session()->all()) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
