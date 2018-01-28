@extends('assignment.main')
@section('assignment')
<div id="create">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" id="create-tab" data-toggle="tab" href="#assignment_create" role="tab"
               aria-controls="assignment_create" aria-expanded="true">{{ __('message.create') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" id="setting-tab" data-toggle="tab" href="#setting" role="tab" aria-controls="setting">{{ __('message.setting') }}</a>
        </li>
    </ul>
    <div class="tab-content">
        <div id="assignment_create" class="tab-pane fade">
            <div class="mb-5 card question" type="multiple_choice">
                <h5 class="card-header">
                    <a class="remove_question"><i class="fa fa-times" aria-hidden="true"></i></a>
                    &nbsp;{{ __('message.multipleChoiceQuestion') }}
                </h5>
                <div class="card-body"><textarea rows="5"
                                                 class="form-control col-md-12"
                                                 placeholder="{{ __('message.multipleChoiceCreate') }}"></textarea>
                    <div class="row mt-3">
                        <p class="col-md-10 text-center">{{ __('message.choices') }}</p>
                        <p class="col-md-2 text-center">{{ __('message.correct') }}</p>
                    </div>
                    <div class="choice">
                        <div class="row" id="multiple_choice_choice"><i class="remove_choice fa fa-times ml-3"
                                                                        aria-hidden="true"
                                                                        style="margin-top: 0.65rem"></i><input
                                    placeholder="{{ __('message.choice') }}" class="form-control col-md-10 mb-3 ml-2">
                            <div class="custom-control custom-checkbox ml-5" style="margin-top: 0.4rem">
                                <input type="checkbox" class="custom-control-input">
                                <label class="custom-control-label"></label>
                            </div>
                        </div>                                                                       
                    </div>
                    <button class="btn btn-outline-secondary pull-right add_choice">{{ __('message.addChoice')}}</button>
                </div>
            </div> <!--MCQ-->

            <div class="question mb-5 card" type="fill_in_the_blank">
                <h5 class="card-header">
                    <a class="remove_question"><i class="fa fa-times"
                                                  aria-hidden="true"></i></a>&nbsp;{{ __('message.fitbQuestion') }}
                </h5>
                <div class="card-body">              
                    <div class="row">
                        <span class="col-md-1 ml-2 text-center">{{ __('message.prompt') }}</span>
                        <div class="form-control col-md-8 mb-3 ml-3 fitb_prompt" contentEditable="true"></div>
                        <button class="btn btn-outline-info ml-2 col-md-2 mb-3 h-25 add_choice">{{ __('message.addBlank')}}</button>
                    </div>
                    <!-- <input placeholder="{{ __('message.answer') }}" class="form-control col-md-4 mb-3 ml-3"> -->
                    <div class="row">
                        <span class="col-md-1 text-center ml-2">{{ __('message.answer') }}</span>  
                        <div class="mb-3 blanks col-md-10">
                            <div class="row" id="fitb_blank" aria-hidden="true" hidden="true"><i class="remove_blank fa fa-times"
                                                                            style="margin-top: 0.65rem"></i><input
                                        placeholder="{{ __('message.blank') }}" class="form-control col-md-10 mb-2 ml-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!--FITB-->

            <div class="question mb-5 card" type="matching">
                <h5 class="card-header mb-3">
                    <a class="remove_question"><i class="fa fa-times"
                                                  aria-hidden="true"></i></a>
                    &nbsp;{{ __('message.matchingQuestions') }}
                </h5>
                <div class="card-body"><textarea rows="5" class="form-control col-md-12"></textarea>
                    <br>
                    <div class="form-group-vertical pairs">
                        <div class="row" id="matching_pair"><a class="remove_choice"><i class="fa fa-times mt-2 ml-4"
                                                                                        aria-hidden="true"></i></a><input
                                    class="form-control col-md-5 mb-3 ml-3 mr-4"
                                    placeholder="{{ __('message.leftChoice')}}"><input
                                    class="form-control col-md-5 mb-3 ml-5"
                                    placeholder="{{ __('message.rightChoice')}}">
                        </div>
                        <div class="row"><a class="remove_choice"><i class="fa fa-times mt-2 ml-4"
                                                                     aria-hidden="true"></i></a><input
                                    class="form-control col-md-5 mb-3 ml-3 mr-4"
                                    placeholder="{{ __('message.leftChoice')}}"><input
                                    class="form-control col-md-5 mb-3 ml-5"
                                    placeholder="{{ __('message.rightChoice')}}">
                        </div>
                        <div class="row"><a class="remove_choice"><i class="fa fa-times mt-2 ml-4"
                                                                     aria-hidden="true"></i></a><input
                                    class="form-control col-md-5 mb-3 ml-3 mr-4"
                                    placeholder="{{ __('message.leftChoice')}}"><input
                                    class="form-control col-md-5 mb-3 ml-5"
                                    placeholder="{{ __('message.rightChoice')}}">
                        </div>
                        <div class="row"><a class="remove_choice"><i class="fa fa-times mt-2 ml-4"
                                                                     aria-hidden="true"></i></a><input
                                    class="form-control col-md-5 mb-3 ml-3 mr-4"
                                    placeholder="{{ __('message.leftChoice')}}"><input
                                    class="form-control col-md-5 mb-3 ml-5"
                                    placeholder="{{ __('message.rightChoice')}}">
                        </div>
                    </div>
                    <button class="btn btn-outline-secondary pull-right add_choice">{{ __('message.addMatch') }}
                    </button>
                </div>
            </div> <!--MATCHING-->
            
            <div class="question mb-5 card" type="short_answer">
                <h5 class="card-header mb-3">
                    <a class="remove_question"><i class="fa fa-times"
                                                  aria-hidden="true"></i></a>
                    &nbsp;{{ __('message.essayQuestion') }}
                </h5>
                <div class="card-body"><textarea rows="6" class="form-control text-left col-md-12"
                                                 placeholder="{{ __('message.essayPrompt') }}"></textarea>
                </div>
            </div> <!--SRQ-->
            <div id="all_questions">
            </div>

            <div class="card">
                <h6 class="text-center card-header">{{ __('message.addQuestion') }}</h6>
                <div class="card-body">
                    <label for="select_question_type" class="text-center">{{ __('message.selectQuestionType') }}
                        &nbsp;</label>
                    <div class="row ml-3">
                        <select class="custom-select col-md-6" v-model="select_question_type">
                            <option value="multiple_choice">{{ __('message.multipleChoiceQuestion')}}</option>
                            <option value="fill_in_the_blank">{{ __('message.fitbQuestion')}}</option>
                            <option value="matching">{{ __('message.matchingQuestions')}}</option>
                            <option value="short_answer">{{ __('message.essayQuestion')}}</option>
                        </select>
                        <input type="number" v-model="amount">
                        <button class="btn btn-outline-info col-md-3"
                                v-on:click="addQuestion">{{ __('message.addQuestion')}}</button>
                    </div>
                </div>
            </div>
        </div>
            <div id="setting" class="card tab-pane fade show active">
                <form action="/courses/{{ $course->id }}/assignments" method="post" id="submit_form">
                    {{ csrf_field() }}
                    <input type="hidden" name="questions">
                    <input type="hidden" name="correct">
                    <input type="hidden" name="setting">
                    <input required="required" class="settings" type="text" name="name" placeholder="name">
                    <input required="required" class="settings" type="datetime-local" name="dueTime">
                </form>
            </div>
        </div>
        <br>
        <button class="btn btn-outline-primary pull-right" v-on:click="submit">Submit</button>
</div>
@endsection