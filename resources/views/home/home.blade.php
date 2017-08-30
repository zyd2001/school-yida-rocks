@extends('home.main')
@section('home')
<div class="row">
    @include('layouts.assignments')
    <div class="col-md-8">
        {{ __('message.test') }}
    </div>
</div>
@endsection
