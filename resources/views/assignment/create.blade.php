@extends('assignment.main')
@section('assignment')
    <div id="assignment_create">
        <div class="mb-5 card question" type="0">
            <h5 class="card-header">
                <a class="remove_question"><i class="fa fa-times" aria-hidden="true"></i></a>
                &nbsp;{{ __('message.multipleChoiceQuestion') }}
            </h5>
            <div class="card-body"><textarea rows="5"
                                             class="form-control col-md-12"
                                             placeholder="{{ __('message.multipleChoiceCreate') }}" name="editor"></textarea>
                <div class="row mt-3">
                    <p class="col-md-10 text-center">{{ __('message.choices') }}</p>
                    <p class="col-md-2 text-center">{{ __('message.correct') }}</p>
                </div>
                <div>
                    <div class="row" id="multiple_choice_choice"><i class="remove_choice fa fa-times ml-3"
                                                                    aria-hidden="true"
                                                                    style="margin-top: 0.65rem"></i><input
                                placeholder="{{ __('message.choice') }}" class="form-control col-md-10 mb-3 ml-2">
                        <label class="custom-control custom-checkbox ml-5" style="margin-top: 0.4rem"><input
                                    class="custom-control-input col-md-2" type="checkbox"><span
                                    class="custom-control-indicator"></span>
                            <span class="custom-control-description"></span>
                        </label>
                    </div>
                    <div class="row"><i class="remove_choice fa fa-times ml-3" aria-hidden="true"
                                        style="margin-top: 0.65rem"></i><input
                                placeholder="{{ __('message.choice') }}" class="form-control col-md-10 mb-3 ml-2">
                        <label
                                class="custom-control custom-checkbox ml-5" style="margin-top: 0.4rem"><input
                                    class="custom-control-input col-md-2" type="checkbox"><span
                                    class="custom-control-indicator"></span>
                            <span
                                    class="custom-control-description"></span>
                        </label>
                    </div>
                    <div class="row"><i class="remove_choice fa fa-times ml-3" aria-hidden="true"
                                        style="margin-top: 0.65rem"></i><input
                                placeholder="{{ __('message.choice') }}" class="form-control col-md-10 mb-3 ml-2">
                        <label class="custom-control custom-checkbox ml-5" style="margin-top: 0.4rem"><input
                                    class="custom-control-input col-md-2" type="checkbox"><span
                                    class="custom-control-indicator"></span>
                            <span class="custom-control-description"></span>
                        </label>
                    </div>
                    <div class="row"><i class="remove_choice fa fa-times ml-3" aria-hidden="true"
                                        style="margin-top: 0.65rem"></i><input
                                placeholder="{{ __('message.choice') }}" class="form-control col-md-10 mb-3 ml-2">
                        <label class="custom-control custom-checkbox ml-5" style="margin-top: 0.4rem"><input
                                    class="custom-control-input col-md-2" type="checkbox"><span
                                    class="custom-control-indicator"></span>
                            <span class="custom-control-description"></span>
                        </label>
                    </div>
                </div>
                <button class="btn btn-outline-secondary pull-right add_choice">{{ __('message.addChoice')}}</button>
            </div>
        </div>
        <div class="question mb-5 card" type="1">
            <h5 class="card-header">
                <a class="remove_question"><i class="fa fa-times"
                                              aria-hidden="true"></i></a>&nbsp;{{ __('message.fitbQuestion') }}
            </h5>
            <div class="row mt-3">
                <p class="col-md-7 ml-5 text-center">{{ __('message.prompt') }}</p>
                <p class="col-md-4 ml-3 text-center">{{ __('message.answer') }}</p>
            </div>
            <div class="row"><textarea rows="3" class="form-control col-md-7 mb-3 ml-5"
                                       placeholder="{{ __('message.fitbCreate') }}"></textarea><input
                        placeholder="{{ __('message.answer') }}"
                        class="form-control col-md-4 mb-3 ml-3">
            </div>
        </div>
        <div class="question mb-5 card" type="2">
            <h5 class="card-header mb-3">
                <a class="remove_question"><i class="fa fa-times"
                                              aria-hidden="true"></i></a>
                &nbsp;{{ __('message.matchingQuestions') }}
            </h5>
            <div class="card-body"><textarea rows="5" class="form-control col-md-12"></textarea>
                <br>
                <div class="form-group-vertical">
                    <div class="row" id="matching_pair"><a class="remove_choice"><i class="fa fa-times mt-2 ml-4"
                                                                                    aria-hidden="true"></i></a><input
                                class="form-control col-md-5 mb-3 ml-3 mr-4"
                                placeholder="{{ __('message.leftChoice')}}"><input
                                class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                    <div class="row"><a class="remove_choice"><i class="fa fa-times mt-2 ml-4"
                                                                 aria-hidden="true"></i></a><input
                                class="form-control col-md-5 mb-3 ml-3 mr-4"
                                placeholder="{{ __('message.leftChoice')}}"><input
                                class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                    <div class="row"><a class="remove_choice"><i class="fa fa-times mt-2 ml-4"
                                                                 aria-hidden="true"></i></a><input
                                class="form-control col-md-5 mb-3 ml-3 mr-4"
                                placeholder="{{ __('message.leftChoice')}}"><input
                                class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                    <div class="row"><a class="remove_choice"><i class="fa fa-times mt-2 ml-4"
                                                                 aria-hidden="true"></i></a><input
                                class="form-control col-md-5 mb-3 ml-3 mr-4"
                                placeholder="{{ __('message.leftChoice')}}"><input
                                class="form-control col-md-5 mb-3 ml-5" placeholder="{{ __('message.rightChoice')}}">
                    </div>
                </div>
                <button class="btn btn-outline-secondary pull-right add_choice">{{ __('message.addMatch') }}
                </button>
            </div>
        </div>
        <div class="question mb-5 card" type="3">
            <h5 class="card-header mb-3">
                <a class="remove_question"><i class="fa fa-times"
                                              aria-hidden="true"></i></a>
                &nbsp;{{ __('message.essayQuestion') }}
            </h5>
            <div class="card-body"><textarea rows="6" class="form-control text-left col-md-12"
                                             placeholder="{{ __('message.essayPrompt') }}"></textarea>
            </div>
        </div>
        <div id="all_questions">
        </div>

        <div class="card">
            <h6 class="text-center card-header">{{ __('message.addQuestion') }}</h6>
            <div class="card-body">
                <label for="select_question_type" class="text-center">{{ __('message.selectQuestionType') }}
                    &nbsp;</label>
                <div class="row ml-3">
                    <select class="custom-select col-md-6" v-model="select_question_type">
                        <option value="0">{{ __('message.multipleChoiceQuestion')}}</option>
                        <option value="1">{{ __('message.fitbQuestion')}}</option>
                        <option value="2">{{ __('message.matchingQuestions')}}</option>
                        <option value="3">{{ __('message.essayQuestion')}}</option>
                    </select>
                    <input type="number" v-model="amount">
                    <button class="btn btn-outline-info col-md-3"
                            v-on:click="addQuestion">{{ __('message.addQuestion')}}</button>
                </div>
            </div>
        </div>
        <button class="btn btn-outline-primary" v-on:click="submit">Submit</button>
        <form action="/courses/{{ $course->id }}/assignments" method="post">
            {{ csrf_field() }}
            <input type="hidden" name="questions">
            <input type="hidden" name="correct">
            <input type="hidden" name="setting">
            <input type="hidden" name="dueTime">
        </form>
    </div>
    {{--<div class="hidden">--}}
    {{--<span name="multipleChoiceQuestion">{{ __('message.multipleChoiceQuestion')}}</span>--}}
    {{--<span name="fitbQuestion">{{ __('message.fitbQuestion')}}</span>--}}
    {{--<span name="matchingQuestions">{{ __('message.matchingQuestions')}}</span>--}}
    {{--<span name="essayQuestion">{{ __('message.essayQuestion')}}</span>--}}
    {{--<span name="leftChoice">{{ __('message.leftChoice')}}</span>--}}
    {{--<span name="rightChoice">{{ __('message.rightChoice')}}</span>--}}
    {{--<span name="essayPrompt">{{ __('message.essayPrompt')}}</span>--}}
    {{--<span name="choices">{{ __('message.choices')}}</span>--}}
    {{--<span name="prompt">{{ __('message.prompt')}}</span>--}}
    {{--<span name="answer">{{ __('message.answer')}}</span>--}}
    {{--<span name="fitbCreate">{{ __('message.fitbCreate')}}</span>--}}
    {{--<span name="correct">{{ __('message.correct')}}</span>--}}
    {{--<span name="choice">{{ __('message.answer')}}</span>--}}
    {{--<span name="multipleChoiceCreate">{{ __('message.multipleChoiceCreate')}}</span>--}}
    {{--<span name="addChoice">{{ __('message.addChoice')}}</span>--}}
    {{--<span name="addMatch">{{ __('message.addMatch')}}</span>--}}
@endsection