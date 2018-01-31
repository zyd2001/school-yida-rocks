@extends('course.main')
@section('course')
<div id="course_create">
    <form action="/courses" method="post">
        {{ csrf_field() }}
        <div class="card">
       		<h5 class="card-header">{{ __('message.createCourse') }}</h5>
        	<div class="card-body">
        		<div class="row mb-3">
			        <input name="name" placeholder="{{ __('message.nameOfCourse') }}" class="form-control col-md-8 ml-3" required>
<!-- 	                <label class="custom-control custom-checkbox ml-5 mt-2">
		                <input name="public" type="checkbox" class="custom-control-input col-md-2">
		                <span class="custom-control-indicator"></span>
		                <span class="custom-control-description">{{ __('message.makeCoursePublic') }}</span>
	                </label> -->
                    <div class="custom-control custom-checkbox ml-5 mt-2" style="margin-top: 0.4rem">
                        <input type="checkbox" class="custom-control-input" id="publicCheck">
                        <label class="custom-control-label" for="publicCheck">{{ __('message.makeCoursePublic') }}</label>
                    </div>   	                
                </div>
            	<textarea class="form-control col-md-12" placeholder="{{ __('message.courseDescription') }}" required rows="5"></textarea>
            	<div class="row ml-3 mt-3">
            		<span>{{ __('message.courseType') }}:</span>
	                <label class="control control--radio ml-5 mt-1">{{ __('message.courseCourse')}}
	                    <input name="type" checked="true" type="radio" value="course" />
	                    <div class="control__indicator"></div>
	                </label>
	                <label class="control control--radio ml-5 mt-1">{{ __('message.courseGroup')}}
	                    <input name="type" type="radio" value="group"/>
	                    <div class="control__indicator"></div>
	                </label>                
                </div>
		        <input type="hidden" name="settings">
		        <button type="submit" class="btn btn-outline-success mt-3">{{ __('message.createCourseNow') }}</button>
	        </div>
        </div>
    </form>
</div>
@endsection