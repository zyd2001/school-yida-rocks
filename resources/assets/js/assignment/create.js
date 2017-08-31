if (window.innerWidth <= 800)
    showMessage('Please use PC or tablet', 0);


const create = new Vue({
    el: '#assignment_create',
    data: {
    	num_of_questions: 0,
    	question_type: null,
    },
    mounted: function () {

    },
    methods: {
    	createNewQuestion: function() {
    		console.log(this.num_of_questions);
    		this.question_type = $("#select_question_type").val();
    		switch (this.question_type) {
    			case 0:
    				$("#all_questions").append("    <div class='multiple_choice mb-5 card'><h5 class='card-header col-md-12'>{{ __('message.multipleChoiceQuestion') }}</h5><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><textarea rows='5' class='form-control col-md-12' placeholder='{{ __('message.multipleChoiceCreate') }}'></textarea><div class='row'><p class='col-md-10 text-center'>{{ __('message.choices') }}</p><p class='col-md-2 text-center'>{{ __('message.correct') }}</p></div><div class='row'><input placeholder='{{ __('message.choice') }}1' class='form-control col-md-10 mb-3 mr-4 ml-3'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label><!-- <input type='checkbox' class='form-control col-md-2'> --></div><div class='row'><input placeholder='{{ __('message.choice') }}2' class='form-control col-md-10 mb-3 mr-4 ml-3'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label><!-- <input type='checkbox' class='form-control col-md-2'> --></div><div class='row'><input placeholder='{{ __('message.choice') }}3' class='form-control col-md-10 mb-3 mr-4 ml-3'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'<span class='custom-control-indicator'></span<span class='custom-control-description'></span</label<!-- <input type='checkbox' class='form-control col-md-2'> --</div<div class='row'><input placeholder='{{ __('message.choice') }}4' class='form-control col-md-10 mb-3 mr-4 ml-3'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label><!-- <input type='checkbox' class='form-control col-md-2'> --></div></div></div>")
    				break;
    			case 1:
    				break;
    			case 2:
    				break;
    			case 3:
    				break;
    		}
    		console.log(this.question_type);}
    },
});