@extends('layouts.app')
@section('content')
    <div id="setting">
        <input type="password" v-model="password">
        <input type="password" v-model="passwordConfirm">
        <input type="submit" class="btn btn-primary" v-on:click="reset">
    </div>
@endsection

@section('script')
    @parent
    <script src="{{ asset('js/home.js') }}"></script>
@endsection