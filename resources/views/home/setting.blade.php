@extends('home.main')
@section('home')

<div class="list-group" id="setting">
	<div class="card mb-3">
		<h5 class="card-header">{{ __('message.checkEmail')}}</h5>
		<div class="card-body">
			<input type="text" class="form-control" placeholder="{{ auth()->user()->email }}" disabled>
        </div>
	</div>
	<div class="card mb-3">
		<h5 class="card-header">{{ __('message.changeName')}}</h5>
		<div class="card-body">
			<div class="row">
				<input type="text" class="form-control col-md-5 ml-4" v-model="firstName" placeholder="{{ __('message.firstName') }}">
				<input type="text" class="form-control col-md-5 ml-3 mr-4" v-model="lastName" placeholder="{{ __('message.lastName') }}">
				<button class="btn btn-outline-primary ml-5" v-on:click="saveName">{{ __('message.save') }}</button>
			</div>
        </div>
	</div>
    <div class="card mb-3">
		<h5 class="card-header">{{ __('message.changePassword')}}</h5>
		<div class="card-body row">
	        <input type="password" v-model="password" class="form-control col-md-4 ml-3" placeholder="{{ __('message.enterPassword') }}">
	        <input type="password" v-model="passwordConfirm" class="form-control col-md-4 ml-3" placeholder="{{ __('message.confirmPassword') }}">
	        <button class="btn btn-outline-primary ml-3" v-on:click="reset">{{ __('message.submit') }}</button>
		</div>
	</div>
	<div class="card mb-3">
		<h5 class="card-header">{{ __('message.chooseUserAvatar')}}</h5>
		<div class="container mt-5 mb-5">
			<img v-bind:src="user_avatar" height="100">
			<button class="btn btn-outline-primary" id="upload_user_avatar">{{ __('message.chooseUserAvatar') }}</button>
		</div>
	</div>
	<div class="card mb-3">
		<h5 class="card-header">{{ __('message.userDescription')}}</h5>
		<div class="card-body">
        	<textarea rows="5" class="form-control col-md-12 pull-left" v-model="description" placeholder="{{ __('message.promptUserDescription') }}"></textarea>
        	<button class="btn btn-outline-primary pull-right mt-3" v-on:click="saveDescription">{{ __('message.save') }}</button>
        </div>
	</div>
</div>
@endsection

@section('head')
    @parent
    <meta name="id" content="{{ auth()->user()->id }}">
@endsection