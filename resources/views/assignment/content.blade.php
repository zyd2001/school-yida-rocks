<div class="card">
    <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(question, index) in questions">
            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
                {{--multiple choice--}}
                @{{ Number(index)+1 }}.&nbsp;@{{ question.question }}
            <span v-for="(choice, i) in question.answer"><input type="radio" v-bind:name="index" v-bind:value="i">@{{ choice }}</span>
            </div>
            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
                {{--fill the blank--}}
            </div>
        </li>
    </ul>
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

        <form action="/assignments/{{ $assignment->id }}" method="post" id="submit_form">
            <input type="hidden" name="answer">
            {{ csrf_field() }}
        </form>
    </div>
</div>