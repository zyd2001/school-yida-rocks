@extends('home.main')
@section('home')
    <div id="setting">
        <input type="password" v-model="password">
        <input type="password" v-model="passwordConfirm">
        <input type="submit" class="btn btn-primary" v-on:click="reset">
    </div>
@endsection