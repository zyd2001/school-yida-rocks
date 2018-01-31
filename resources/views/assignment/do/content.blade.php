<div class="card" id="wrapping_card">
    <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(question, index) in questions">
            <div v-if="question.type === 0" v-bind:id="index">
                {{--multiple choice--}}
                <h6>@{{ Number(index)+1 }}.&nbsp;@{{ question.question }}</h6>
                <div v-for="(choice, i) in question.answer">
                    {{--<label class="control control--radio">@{{ i }}.&nbsp;@{{ choice}}--}}
                        {{--<input type="radio" v-bind:name="index" v-bind:value="i"/>--}}
                        {{--<div class="control__indicator"></div>--}}
                    {{--</label>--}}
<!--                     <label>
                        <input type="radio" v-bind:name="index" v-bind:value="i"/>
                        @{{ i }}.&nbsp;@{{ choice }}
                    </label> -->
                    <div class="custom-control custom-checkbox" style="margin-top: 0.4rem">
                        <input type="checkbox" class="custom-control-input" v-bind:id="index + '_' + i" v-bind:name="index" v-bind:value="i">
                        <label class="custom-control-label" v-bind:for="index + '_' + i">@{{ i }}.&nbsp;@{{ choice }}</label>
                    </div>                    
                </div>
            </div>
            <div v-else-if="question.type === 1" v-bind:id="index" class="row">
                {{--fill the blank--}}
                <h6>@{{ Number(index) + 1}}.&nbsp;</h6>
                <span v-for="(content, key) in question.question">
                    @{{ content }}
                    <span v-if="key != question.question.length - 1" class="blank-text" contentEditable="true" v-on:input="blank">&nbsp;&nbsp;</span>
                </span>
            </div>
            <div v-else-if="question.type === 2" v-bind:id="index">
                {{--matching--}}
                <h6>@{{ Number(index)+1 }}.&nbsp;@{{ question.question.title }}</h6>
                <br>
                <div class="row">
                    <ul class="col-4">
                        <a href="#" v-on:click.prevent="match" v-bind:order="i" v-bind:index="index" class="matching-list" v-for="(q, i) in question.question.content">@{{ Number(i)+1 }}.&nbsp;@{{ q }}</a>
                    </ul>
                    <div class="col-4"><canvas v-bind:id="'canvas-' + index" height="0" width="0"></canvas></div>
                    <ul class="col-4">
                        <a href="#" onclick="event.preventDefault();" v-bind:index="index" class="matching-list disabled" v-for="(a, i) in question.answer" v-bind:value="i">@{{ i }}.&nbsp;@{{ a }}</a>
                    </ul>
                </div>
                <input type="hidden" name="result">
            </div>
            <div v-else-if="question.type === 3" v-bind:id="index">
                <h6>@{{ Number(index)+1 }}.&nbsp;@{{ question.question }}</h6>
                <textarea name="essay" class="form-control"></textarea>
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
        <button id="get_description" class="btn btn-outline-secondary" href="#" data-toggle="modal"
                data-target="#confirm_msg">Back to Description
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