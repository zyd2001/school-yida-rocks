<div class="card" id="wrapping_card">
    <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(question, index) in questions">
            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
                {{--multiple choice--}}
                <h6>@{{ Number(index)+1 }}.&nbsp;@{{ question.question }}</h6>
                <div v-for="(choice, i) in question.answer">
                    <label class="control control--radio">@{{ i }}.&nbsp;@{{ choice}}
                        <input type="radio" v-bind:name="index" v-bind:value="i"/>
                        <div class="control__indicator"></div>
                    </label>
                </div>
            </div>
            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
                {{--fill the blank--}}
            </div>
        </li>
    </ul>
    <div class="matching_questions">
        <h6 class="text-center">Matching Questions:</h6>
        <div class="btn-group-vertical pull-left" id="left_group">
            <button class="left_choice btn btn-secondary mb-1" id="left_1">1</button>
            <button class="left_choice btn btn-secondary mb-1" id="left_2">2</button>
            <button class="left_choice btn btn-secondary mb-1" id="left_3">3</button>
            <button class="left_choice btn btn-secondary mb-1" id="left_4">4</button>
            <button class="left_choice btn btn-secondary mb-1" id="left_5">5</button>
        </div>
        <div class="btn-group-vertical pull-right" id="right_group">
            <button class="right_choice btn btn-secondary mb-1" id="right_1">A</button>
            <button class="right_choice btn btn-secondary mb-1" id="right_2">B</button>
            <button class="right_choice btn btn-secondary mb-1" id="right_3">C</button>
            <button class="right_choice btn btn-secondary mb-1" id="right_4">D</button>
            <button class="right_choice btn btn-secondary mb-1" id="right_5">E</button>
        </div>
        <div class="completed_choices">
        </div>
    </div>
</div>
<div class="mt-3">
    <div class="btn-group pull-left">
        <button class="btn btn-outline-primary" v-on:click="save(0)">Save to local</button>
        <button class="btn btn-outline-primary" v-on:click="save(1)">Save to server</button>
    </div>
    <div class="pull-right">
        <button id="get_description" class="btn btn-outline-secondary" href="#" data-toggle="modal" data-target="#confirm_msg">Back to Description
        </button>
        <div class="modal fade" id="confirm_msg" tabindex="-1" role="dialog" aria-labelledby="confirm_msgLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirm_msgLabel">{{ __('message.notice') }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{ __('message.exitConfirm') }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Back to Assignment</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="
        		    		$('#assignment_description').slideToggle();
        					$('#assignment_content').slideToggle(); ">Confirm Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn btn-outline-success" v-on:click="submit">Submit</button>

        <form action="/assignments/{{ $assignment->id }}/submit" method="post" id="submit_form">
            <input type="hidden" name="answer">
            {{ csrf_field() }}
        </form>
    </div>
</div>