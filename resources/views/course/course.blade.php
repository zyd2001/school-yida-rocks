@extends('course.main')

@section('course')
<!-- 
<div class="row" id="course_description" style="display:none">
	<div class="card col-md-2 pull-left">
		<img class="card-img-top mb-3" src="{{ $course->avatar }}">
		<ul class="list-group list-group-flush">
			<button class="btn btn-outline-primary list-group-item mt-1" id="button_description" onclick="show_description();">{{ __('message.description') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_materials" onclick="show_materials();">{{ __('message.materials') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_updates" onclick="show_updates();">{{ __('message.updates') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_assignments" onclick="show_assignments();">{{ __('message.assignments') }}</button>
		</ul>
	</div>
	@include('course.course.description')
</div>

<div class="row" id="course_materials" style="display:none">
	<div class="card col-md-2 pull-left">
		<img class="card-img-top mb-3" src="{{ $course->avatar }}">
		<ul class="list-group list-group-flush">
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_description" onclick="show_description();">{{ __('message.description') }}</button>
			<button class="btn btn-outline-primary list-group-item mt-1" id="button_materials" onclick="show_materials();">{{ __('message.materials') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_updates" onclick="show_updates();">{{ __('message.updates') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_assignments" onclick="show_assignments();">{{ __('message.assignments') }}</button>
		</ul>
	</div>
	@include('course.course.materials')
</div>

<div class="row" id="course_updates" style="display:none">
	<div class="card col-md-2 pull-left">
		<img class="card-img-top mb-3" src="{{ $course->avatar }}">
		<ul class="list-group list-group-flush">
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_description" onclick="show_description();">{{ __('message.description') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_materials" onclick="show_materials();">{{ __('message.materials') }}</button>
			<button class="btn btn-outline-primary list-group-item mt-1" id="button_updates" onclick="show_updates();">{{ __('message.updates') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_assignments" onclick="show_assignments();">{{ __('message.assignments') }}</button>
		</ul>
	</div>
	@include('course.course.updates')
</div>

<div class="row" id="course_assignments" style="display:none">
	<div class="card col-md-2 pull-left">
		<img class="card-img-top mb-3" src="{{ $course->avatar }}">
		<ul class="list-group list-group-flush">
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_description" onclick="show_description();">{{ __('message.description') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_materials" onclick="show_materials();">{{ __('message.materials') }}</button>
			<button class="btn btn-outline-secondary list-group-item mt-1" id="button_updates" onclick="show_updates();">{{ __('message.updates') }}</button>
			<button class="btn btn-outline-primary list-group-item mt-1" id="button_assignments" onclick="show_assignments();">{{ __('message.assignments') }}</button>
		</ul>
	</div>
	@include('course.course.assignments')
</div>
 -->
<div class="card">
	<div class="card-header text-left">
		<img src="{{ $course->avatar }}" class="ml-1 pull-left">
		<h5 class="ml-1 mt-3">&nbsp;{{ $course->name }}</h5>
	</div>
<ul class="nav nav-tabs" id="myTab" role="tablist">
	<li class="nav-item">
		<a class="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-expanded="true">{{ __('message.description') }}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link" id="materials-tab" data-toggle="tab" href="#materials" role="tab" aria-controls="materials">{{ __('message.materials') }}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link" id="updates-tab" data-toggle="tab" href="#updates" role="tab" aria-controls="updates">{{ __('message.updates') }}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link" id="assignments-tab" data-toggle="tab" href="#assignments" role="tab" aria-controls="assignments">{{ __('message.assignments') }}</a>
	</li>
</ul>
<div class="tab-content" id="myTabContent">
	<div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
		@include('course.course.description')
	</div>
	<div class="tab-pane fade" id="materials" role="tabpanel" aria-labelledby="materials-tab">
		@include('course.course.materials')
	</div>
	<div class="tab-pane fade" id="updates" role="tabpanel" aria-labelledby="updates-tab">
		@include('course.course.updates')
	</div>
	<div class="tab-pane fade" id="assignments" role="tabpanel" aria-labelledby="assignments-tab">
		@include('course.course.assignments')
	</div>
</div>
</div>
@endsection