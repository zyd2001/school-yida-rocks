<div class="card">
    <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(question, index) in questions">
            <div v-if="question.type === 'multiple_choice'" v-bind:id="index">
                @{{ index }}@{{ question.question }}
                    <span v-for="choice in question.answer"><input type="radio" v-bind:name="index" v-bind:value="choice">@{{ choice }}</span>
            </div>
        </li>
    </ul>
</div>

<button id="get_description" class="btn btn-primary" href="#" data-toggle="modal" data-target="#confirm_msg">Back to
    Assignment Description
</button>

<div class="progress">
    <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0"
         aria-valuemax="100">You have completed this percentage of the assignment
    </div>
</div>

<div class="modal fade" id="confirm_msg" tabindex="-1" role="dialog" aria-labelledby="confirm_msgLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirm_msgLabel">Notice</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to exit the assignment? Your progress will be saved temporarily.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Back to Assignment
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="
		    		$('.assignment_description').slideToggle(function(){
					$('#get_description').html($('.assignment_description').is(':visible')?'Confirm Exit':'Back to Assignment Description');
					});
					$('.assignment_content').slideToggle(function(){
						$('#get_description').html($('.assignment_content').is(':visible')?'Confirm Exit':'Back to Assignment Description');
					}); ">Confirm Exit
                </button>
            </div>
        </div>
    </div>
</div>