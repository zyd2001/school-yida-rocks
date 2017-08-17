@extends('layouts.app')
@section('content')
    <div class="row">
        @include('layouts.assignments')
        <div class="col-md-8">
            {{ __('message.test') }}
        </div>
    </div>
@endsection

@section('script')
    @parent
    <script src="{{ asset('js/home.js') }}"></script>
@endsection
