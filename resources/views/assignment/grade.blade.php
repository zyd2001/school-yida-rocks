<div v-if="correct">
	<div class="card">
	    <ul class="list-group list-group-flush">
	        <li class="list-group-item" v-for="(question, index) in questions">
	            <div v-if="question.type === 0" v-bind:id="index" v-bind:type="question.type">
	                {{--multiple choice--}}
	                @{{ Number(index)+1 }}.&nbsp;@{{ question.question }}:@{{ correct[index] }}
	            <!-- <span v-for="(choice, i) in question.answer"><input type="radio" v-bind:name="index" v-bind:value="i">@{{ choice }}</span> -->
	            </div>
	            <div v-else-if="question.type === 1" v-bind:id="index" v-bind:type="question.type">
	                {{--fill the blank--}}
	            </div>
	        </li>
	    </ul>
	</div>
    <button class="btn btn-info" onclick="$('#assignment_grade').slideToggle();$('#assignment_description').slideToggle()">Back to description</button>
</div>