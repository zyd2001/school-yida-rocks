@extends('course.main')
@section('course')
<div id="course_create">
    <form action="/courses" method="post">
        {{ csrf_field() }}
        <div class="card">
        	<div class="card-header">
        		<h5>{{ __('message.createCourse') }}</h5>
        	</div>
        	<div class="card-body">
        		<div class="row mb-3">
			        <input placeholder="{{ __('message.nameOfCourse') }}" class="form-control col-md-8 ml-3" required>
	                <label class="custom-control custom-checkbox ml-5 mt-2">
		                <input type="checkbox" class="custom-control-input col-md-2">
		                <span class="custom-control-indicator"></span>
		                <span class="custom-control-description">{{ __('message.makeCoursePublic') }}</span>
	                </label>
                </div>
            	<textarea rows="5" class="form-control col-md-12" placeholder="{{ __('message.courseDescription') }}" required></textarea>
		        <input type="hidden" name="settings">
		        <button type="submit" class="btn btn-outline-success mt-3">{{ __('message.createCourseNow') }}</button>
	        </div>
        </div>
    </form>
</div>
@endsection