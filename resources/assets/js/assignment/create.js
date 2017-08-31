if (window.innerWidth <= 800)
    showMessage('Please use PC or tablet', 0);

// var messages[];
// messages['multipleChoiceQuestion'] = $('span[name=multipleChoiceQuestion]').text();
/*var multiple_choice = $('.multiple_choice')[0];
var fill_in_the_blank = $('.fill_in_the_blank')[0];
var matching = $('.matching')[0];
var essay = $('.essay')[0];
$('.card').addClass('hidden');*/

const create = new Vue({
    el: '#assignment_create',
    data: {
    	num_of_questions: 0,
    	question_type: null,
    },
    mounted: function () {

    },
    methods: {
    	nextQuestion: function() {
    		console.log(this.num_of_questions);
    		this.question_type = $("#select_question_type").val();
    		if (this.question_type == 0) {
    			$('.multiple_choice').show(500);
    			$('.fill_in_the_blank').hide(500);	    			
    			$('.matching').hide(500);
    			$('.essay').hide(500);
    			this.num_of_questions++;
    		}
    		else if (this.question_type == 1) {
    			$('.multiple_choice').hide(500);
    			$('.fill_in_the_blank').show(500);	    			
    			$('.matching').hide(500);
    			$('.essay').hide(500);    			
    			this.num_of_questions++;
    		}
    		else if (this.question_type == 2) {
    			$('.multiple_choice').hide(500);
    			$('.fill_in_the_blank').hide(500);	    			
    			$('.matching').show(500);
    			$('.essay').hide(500);    			
    			this.num_of_questions++;
    		}
    	   	else if (this.question_type == 3) {
    			$('.multiple_choice').hide(500);
    			$('.fill_in_the_blank').hide(500);	    			
    			$('.matching').hide(500);
    			$('.essay').show(500);    			
    			this.num_of_questions++;
    		}
    		else {
    			console.log("false");
    		}
    	}
    },
});