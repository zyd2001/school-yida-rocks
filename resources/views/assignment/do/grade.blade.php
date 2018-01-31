<div v-if="correct">
	<div class="card">
	    <ul class="list-group list-group-flush">
	        <li v-for="(question, index) in questions" class="list-group-item">
	        	<div v-if="answer[index].equals(correct[index])" class="border-success">
		            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
		                {{--multiple choice--}}
	               		<h6>@{{ Number(index)+1 }}.&nbsp;<span>@{{ question.question }}:</span></h6>
		                <div class="card-text">
		                	<div v-for="(choice, i) in question.answer">
		                	<span v-if="i === correct[index]" class="text-success">@{{ i }}.&nbsp;@{{ choice }}&nbsp;&nbsp;</span>
		                	<span v-else>@{{ i }}.&nbsp;@{{ choice }}&nbsp;&nbsp;</span>
		                	</div>
						</div>
						<br>
		            	<span class="text-success">{{ __('message.correctAnswer') }}<span class="text-success">&nbsp;(@{{ correct[index] }})</span></span>
		            </div>
		            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
		                {{--fill the blank--}}
		            </div>
	           	</div>
				<div v-else-if="answer[index] === null" class="border-warning">
		            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
		                {{--multiple choice--}}
                		<h6>@{{ Number(index)+1 }}.&nbsp;<span>@{{ question.question }}:</span></h6>
	                	<div class="card-text">
		                	<div v-for="(choice, i) in question.answer">
			                	<span v-if="i === correct[index]" class="text-success">@{{ i }}.&nbsp;@{{ choice }}&nbsp;&nbsp;</span>
			                	<span v-else>@{{ i }}.&nbsp;@{{ choice }}&nbsp;&nbsp;</span>
			                </div>
						</div>
						<br>
						<span class="text-warning">{{ __('message.noAnswer') }}&nbsp;@{{ correct[index] }}.</span>
		            </div>
		            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
		                {{--fill the blank--}}
		            </div>
	            </div>
	            <div v-else class="border-danger">
		            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
		                {{--multiple choice--}}
                		<h6>@{{ Number(index)+1 }}.&nbsp;<span>@{{ question.question }}:</span></h6>
	                	<div class="card-text">
	                		<div v-for="(choice, i) in question.answer">
		                		<span v-if="i === correct[index]" class="text-success">@{{ i }}.&nbsp;@{{ choice }}&nbsp;&nbsp;</span>
		                		<span v-else-if="i === answer[index]" class="text-danger">@{{ i }}.&nbsp;@{{ choice }}&nbsp;&nbsp;</span>
		                		<span v-else>@{{ i }}.&nbsp;@{{ choice }}&nbsp;&nbsp;</span>
		                	</div>
						</div>	            	
						<br>
						<span class="text-danger">{{ __('message.wrongAnswer1') }}&nbsp;@{{ answer[index] }}.&nbsp;{{ __('message.wrongAnswer2') }}&nbsp;@{{ correct[index] }}.</span>
		            </div>
		            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
		                {{--fill the blank--}}
		            </div>
	            </div>
	        </li>
	    </ul>
	</div>
	<br>
    <button class="btn btn-info" onclick="$('#assignment_grade').slideToggle();$('#assignment_description').slideToggle()">Back to description</button>
</div>