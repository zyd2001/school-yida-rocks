@extends('assignment.main')
@section('assignment')
<div id="assignment_create">
    <div id="editor_test" class="mb-3"></div>
    <div class="multiple_choice mb-5 card">
        <h5 class="card-header col-md-12">{{ __('message.multipleChoiceQuestion') }}</h5>
        <div class="card-body">
            <textarea rows="5" class="form-control col-md-12" placeholder="{{ __('message.multipleChoiceCreate') }}"></textarea>
            <div class="row">
                <p class="col-md-10 text-center">{{ __('message.choices') }}</p>
                <p class="col-md-2 text-center">{{ __('message.correct') }}</p>
            </div>
            <div class="row">
                <input placeholder="{{ __('message.choice') }}1" class="form-control col-md-10 mb-3 mr-4 ml-3">
                <label class="custom-control custom-checkbox ml-5">
                  <input type="checkbox" class="custom-control-input col-md-2">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description"></span>
                </label>
                <!-- <input type="checkbox" class="form-control col-md-2"> -->
            </div>
            <div class="row">
                <input placeholder="{{ __('message.choice') }}2" class="form-control col-md-10 mb-3 mr-4 ml-3">
                <label class="custom-control custom-checkbox ml-5">
                  <input type="checkbox" class="custom-control-input col-md-2">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description"></span>
                </label>
                <!-- <input type="checkbox" class="form-control col-md-2"> -->
            </div>
            <div class="row">
                <input placeholder="{{ __('message.choice') }}3" class="form-control col-md-10 mb-3 mr-4 ml-3">
                <label class="custom-control custom-checkbox ml-5">
                  <input type="checkbox" class="custom-control-input col-md-2">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description"></span>
                </label>
                <!-- <input type="checkbox" class="form-control col-md-2"> -->
            </div>
            <div class="row">
                <input placeholder="{{ __('message.choice') }}4" class="form-control col-md-10 mb-3 mr-4 ml-3">
                <label class="custom-control custom-checkbox ml-5">
                  <input type="checkbox" class="custom-control-input col-md-2">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description"></span>
                </label>
                <!-- <input type="checkbox" class="form-control col-md-2"> -->
            </div>
        </div>
    </div>
    <div class="fill_in_the_blank mb-5 card">
        <h5 class="card-header col-md-12">{{ __('message.fitbQuestion') }}</h5>
        <div class="card-body">
            <div class="row">
                <p class="col-md-7 text-center">{{ __('message.prompt') }}</p>
                <p class="col-md-4 text-center">{{ __('message.answer') }}</p>
            </div>
            <div class="row">
                <textarea rows="3" class="form-control col-md-7 mb-3 ml-3" placeholder="{{ __('message.fitbCreate') }}"></textarea>
                <input placeholder="{{ __('message.answer') }}:" class="form-control col-md-4 mb-3 ml-3">
            </div>
        </div>
    </div>
    <div class="matching mb-5 card">
        <h5 class="mb-3 card-header col-md-12">{{ __('message.matchingQuestions') }}</h5>
        <div class="card-body">
            <div class="form-group-vertical">
                <div class="row">
                    <input class="form-control col-md-5 mb-3 ml-5 mr-4" placeholder="{{ __('message.leftChoice')}}">
                    <input class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                </div>
                <div class="row">
                    <input class="form-control col-md-5 mb-3 ml-5 mr-4" placeholder="{{ __('message.leftChoice')}}">
                    <input class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                </div>
                <div class="row">
                    <input class="form-control col-md-5 mb-3 ml-5 mr-4" placeholder="{{ __('message.leftChoice')}}">
                    <input class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                </div>
                <div class="row">
                    <input class="form-control col-md-5 mb-3 ml-5 mr-4" placeholder="{{ __('message.leftChoice')}}">
                    <input class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                </div>
                <div class="row">
                    <input class="form-control col-md-5 mb-3 ml-5 mr-4" placeholder="{{ __('message.leftChoice')}}">
                    <input class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                </div>
            </div>
        </div>
    </div>
    <div class="essay mb-5 card">
        <h5 class="mb-3 card-header col-md-12">{{ __('message.essayQuestion') }}</h5>
        <div class="card-body">
            <textarea rows="6" class="form-control text-left col-md-12" placeholder="{{ __('message.essayPrompt') }}"></textarea>      
        </div>          
    </div>

    <div class="row">
        <label for="select_question_type">{{ __('message.selectQuestionType') }}&nbsp;</label>
        <select class="custom-select">
            <option value="0">{{ __('message.multipleChoiceQuestion')}}</option>
            <option value="1">{{ __('message.fitbQuestion')}}</option>
            <option value="2">{{ __('message.matchingQuestions')}}</option>
            <option value="3">{{ __('message.essayQuestion')}}</option>
        </select>
        <button class="btn btn-outline-info ml-5" id="add_question" v-on:click="createNewQuestion">{{ __('message.addQuestion')}}</button>
    </div>
    <form action="/courses/{{ $course->id }}/assignments" method="post">
        {{ csrf_field() }}
        <input type="hidden" name="questions">
        <input type="hidden" name="correct">
        <input type="hidden" name="setting">
        <input type="hidden" name="dueTime">
    </form>
</div>
@endsection