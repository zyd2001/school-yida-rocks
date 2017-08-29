<div v-if="correct">
	<div class="card">
	    <ul class="list-group list-group-flush">
	        <li v-if="answer[index] === correct[index]" class="list-group-item bg-success text-white mb-1" v-for="(question, index) in questions">
	            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
	                {{--multiple choice--}}
	                @{{ Number(index)+1 }}.&nbsp;@{{ question.question }}:
	            	<p v-for="(choice, i) in question.answer">@{{ i }}.&nbsp;@{{ choice }}</p>
	            	<p>{{ __('message.correctAnswer') }}</p>
	            </div>
	            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
	                {{--fill the blank--}}
	            </div>
	        </li>
	        <li v-if="answer[index] === null" class="list-group-item bg-warning text-white mb-1" v-for="(question, index) in questions">
	            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
	                {{--multiple choice--}}
	                @{{ Number(index)+1 }}.&nbsp;@{{ question.question }}:
	            	<p v-for="(choice, i) in question.answer">@{{ i }}.&nbsp;@{{ choice }}</p>
	            	{{ __('message.noAnswer') }}&nbsp;@{{ correct[index] }}.
	            </div>
	            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
	                {{--fill the blank--}}
	            </div>
	        </li>
	        <li v-if="answer[index] != correct[index] && answer[index] != null" class="list-group-item bg-danger text-white mb-1" v-for="(question, index) in questions">
	            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
	                {{--multiple choice--}}
	                @{{ Number(index)+1 }}.&nbsp;@{{ question.question }}:
	            	<p v-for="(choice, i) in question.answer">@{{ i }}.&nbsp;@{{ choice }}</p>
	            	{{ __('message.wrongAnswer1') }}&nbsp;@{{ answer[index] }}.&nbsp;{{ __('message.wrongAnswer2') }}&nbsp;@{{ correct[index] }}.
	            </div>
	            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
	                {{--fill the blank--}}
	            </div>
	        </li>             
	    </ul>
	</div>
    <button class="btn btn-info" onclick="$('#assignment_grade').slideToggle();$('#assignment_description').slideToggle()">Back to description</button>
</div>