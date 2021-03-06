@extends('layouts.app')

@section('content')
    <div class="row" id="verify">
        <div class="card mx-auto">
            <div class="card-header">Verify</div>
            <div class="card-body">
                <form action="/verify" class="form-horizontal" method="post">
                    {{ csrf_field() }}
                    <input type="text" class="form-controller" name="code">
                    <input type="submit" class="form-controller btn btn-primary" value="验证">
                </form>
                <div class="row">
                    <a class="mx-auto" href="#" v-on:click="click" id="re" v-cloak>@{{ text }}</a>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('script')
    @parent
    <script src="{{ asset('js/verify.js') }}"></script>
@endsection
