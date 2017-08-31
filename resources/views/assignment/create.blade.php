@extends('assignment.main')
@section('assignment')
    <div id="assignment_create">
        <div id="editor_test" class="mb-3"></div>
        <form action="/courses/{{ $course->id }}/assignments" method="post">
            {{ csrf_field() }}
            <div class="multiple_choice mb-5">
                <h5>{{ __('message.multipleChoiceQuestion') }}</h5>
                <textarea rows="5" class="form-control col-md-12" placeholder="{{ __('message.multipleChoiceCreate') }}"></textarea>
                <div class="row">
                    <p class="col-md-10 text-center">{{ __('message.choices') }}</p>
                    <p class="col-md-2 text-center">{{ __('message.correct') }}</p>
                </div>
                <div class="row">
                    <input placeholder="{{ __('message.choice') }}1" class="form-control col-md-10 mb-3">
                    <input type="checkbox" class="form-control col-md-2">
                    </div>
                    <div class="row">
                    <input placeholder="{{ __('message.choice') }}2" class="form-control col-md-10 mb-3">
                    <input type="checkbox" class="form-control col-md-2">
                    </div>
                    <div class="row">
                    <input placeholder="{{ __('message.choice') }}3" class="form-control col-md-10 mb-3">
                    <input type="checkbox" class="form-control col-md-2">
                    </div>
                    <div class="row">
                    <input placeholder="{{ __('message.choice') }}4" class="form-control col-md-10 mb-3">
                    <input type="checkbox" class="form-control col-md-2">
                </div>
            </div>
            <div class="fill_in_the_blank mb-5">
                <h5>{{ __('message.fitbQuestion') }}</h5>
                <div class="row">
                    <p class="col-md-8 text-center">{{ __('message.prompt') }}</p>
                    <p class="col-md-4 text-center">{{ __('message.answer') }}</p>
                </div>
                <div class="row">
                    <textarea rows="3" class="form-control col-md-8 mb-3" placeholder="{{ __('message.fitbCreate') }}"></textarea>
                    <input placeholder="{{ __('message.answer') }}:" class="form-control col-md-4 mb-3">
                </div>
            </div>
            <div class="matching mb-5">
                <h5 class="mb-3">{{ __('message.matchingQuestions') }}</h5>
                <div class="form-group-vertical">
                    <div class="row">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.leftChoice')}}">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                    <div class="row">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.leftChoice')}}">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                    <div class="row">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.leftChoice')}}">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                    <div class="row">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.leftChoice')}}">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                    <div class="row">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.leftChoice')}}">
                        <input class="form-control col-md-6 mb-3" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                </div>
            </div>
            <div class="essay mb-5">
                <h5 class="mb-3">{{ __('message.essayQuestion') }}</h5>
                <textarea rows="6" class="form-control btn btn-outline-secondary text-left col-md-12" placeholder="{{ __('message.essayPrompt') }}"></textarea>                
            </div>

            <input type="hidden" name="questions">
            <input type="hidden" name="correct">
            <input type="hidden" name="setting">
            <input type="hidden" name="dueTime">
        </form>
    </div>
@endsection