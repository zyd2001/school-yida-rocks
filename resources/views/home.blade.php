@extends('layouts.app')
@section('content')
    <div class="row">
        @include('layouts.assignments')
        <div class="col-md-8 pull-md-4">
            {{ __('message.test') }}
        </div>
    </div>
@endsection
