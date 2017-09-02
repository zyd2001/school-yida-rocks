if (window.innerWidth <= 800)
    showMessage('Please use PC or tablet', 0);

// var messages[];
// messages['multipleChoiceQuestion'] = $('span[name=multipleChoiceQuestion]').text();
/*var multiple_choice = $('.multiple_choice')[0];
var fill_in_the_blank = $('.fill_in_the_blank')[0];
var matching = $('.matching')[0];
var essay = $('.essay')[0];
$('.card').addClass('hidden');*/
var messages = new Array();
var num_of_questions = new Array(4);
for (var i = 0; i < num_of_questions.length; i++) {
	num_of_questions[i] = 1;
}

messages['multipleChoiceQuestion'] = $('span[name=multipleChoiceQuestion]').text();
messages['fitbQuestion'] = $('span[name=fitbQuestion]').text();
messages['matchingQuestions'] = $('span[name=matchingQuestions]').text();
messages['essayQuestion'] = $('span[name=essayQuestion]').text();
messages['leftChoice'] = $('span[name=leftChoice]').text();
messages['rightChoice'] = $('span[name=rightChoice]').text();
messages['essayPrompt'] = $('span[name=essayPrompt]').text();
messages['choices'] = $('span[name=choices]').text();
messages['prompt'] = $('span[name=prompt]').text();
messages['answer'] = $('span[name=answer]').text();
messages['fitbCreate'] = $('span[name=fitbCreate]').text();
messages['correct'] = $('span[name=correct]').text();
messages['choice'] = $('span[name=choice]').text();
messages['addChoice'] = $('span[name=addChoice]').text();
messages['addMatch'] = $('span[name=addMatch]').text();

messages['multipleChoiceCreate'] = $('span[name=multipleChoiceCreate]').text();
var multiple_choice = "<div class='multiple_choice_question mb-5 card'><div class='card-header'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['multipleChoiceQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><textarea rows='5' class='form-control col-md-12' placeholder='" + messages['multipleChoiceCreate'] + "'></textarea><div class='row'><p class='col-md-10 text-center'>" + messages['choices'] + "</p><p class='col-md-2 text-center'>" + messages['correct'] + "</p></div><div id='multiple_choice_" + num_of_questions[0] + "'><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div></div><button class='btn btn-outline-secondary pull-right add_choice' id='add_to_" + num_of_questions[0] + "'>" + messages['addChoice'] + "</button></div></div>";
var fill_in_the_blank = "<div class='fill_in_the_blank mb-5 card'><div class='card-header'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['fitbQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><div class='row'><p class='col-md-7 text-center'>" + messages['prompt'] + "</p><p class='col-md-4 text-center'>" + messages['answer'] + "</p></div><div class='row'><textarea rows='3' class='form-control col-md-7 mb-3 ml-3' placeholder='" + messages['fitbCreate'] + "'></textarea><input placeholder='" + messages['answer'] + ":' class='form-control col-md-4 mb-3 ml-3'></div></div></div>"
var matching = "<div class='matching mb-5 card'><div class='card-header mb-3'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['matchingQuestions'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><div class='form-group-vertical' id='matching_" + num_of_questions[2] + "'><div class='row'><a class='remove_choice'><i class='fa fa-times mt-2 ml-4' aria-hidden='true'></i></a><input class='form-control col-md-5 mb-3 ml-3 mr-4' placeholder='" + messages['leftChoice'] + "'><input class='form-control col-md-5 mb-3 ml-5' placeholder='" + messages['rightChoice'] + "'></div></div><button class='btn btn-outline-secondary pull-right add_choice' id='add_to_matching_" + num_of_questions[2] + "'>" + messages['addMatch'] + "</button></div></div>"
var essay = "<div class='essay mb-5 card'><div class='card-header mb-3'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['essayQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><textarea rows='6' class='form-control text-left col-md-12' placeholder='" + messages['essayPrompt'] + "'></textarea></div></div>"
var choice = "<a class='remove_choice'><i class='fa fa-times mt-2 ml-3' aria-hidden='true'></i></a><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label>";
var match_pair = "<a class='remove_choice'><i class='fa fa-times mt-2 ml-4' aria-hidden='true'></i></a><input class='form-control col-md-5 mb-3 ml-3 mr-4' placeholder='" + messages['leftChoice'] + "'><input class='form-control col-md-5 mb-3 ml-5' placeholder='" + messages['rightChoice'] + "'>";
const create = new Vue({
    el: '#assignment_create',
    data: {
    	question_type: null,
    },
    mounted: function () {

    },
    methods: {
/*    	nextQuestion: function() {
    		console.log(num_of_questions);
    		this.question_type = $("#select_question_type").val();
    		if (this.question_type == 0) {
    			$('.multiple_choice').show(500);
    			$('.fill_in_the_blank').hide(500);	    			
    			$('.matching').hide(500);
    			$('.essay').hide(500);
    			num_of_questions[0]++;
    		}
    		else if (this.question_type == 1) {
    			$('.multiple_choice').hide(500);
    			$('.fill_in_the_blank').show(500);	    			
    			$('.matching').hide(500);
    			$('.essay').hide(500);    			
    			num_of_questions[1]++;
    		}
    		else if (this.question_type == 2) {
    			$('.multiple_choice').hide(500);
    			$('.fill_in_the_blank').hide(500);	    			
    			$('.matching').show(500);
    			$('.essay').hide(500);    			
    			num_of_questions[2]++;
    		}
    	   	else if (this.question_type == 3) {
    			$('.multiple_choice').hide(500);
    			$('.fill_in_the_blank').hide(500);	    			
    			$('.matching').hide(500);
    			$('.essay').show(500);    			
    			num_of_questions[3]++;
    		}
    		else {
    			console.log("false");
    		}
    	},*/
    	addQuestion: function() {
    		// console.log(num_of_questions, this.question_type);
			multiple_choice = "<div class='multiple_choice_question mb-5 card'><div class='card-header'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['multipleChoiceQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><textarea rows='5' class='form-control col-md-12' placeholder='" + messages['multipleChoiceCreate'] + "'></textarea><div class='row'><p class='col-md-10 text-center'>" + messages['choices'] + "</p><p class='col-md-2 text-center'>" + messages['correct'] + "</p></div><div id='multiple_choice_" + num_of_questions[0] + "'><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div></div><button class='btn btn-outline-secondary pull-right add_choice' id='add_to_" + num_of_questions[0] + "'>" + messages['addChoice'] + "</button></div></div>";
			fill_in_the_blank = "<div class='fill_in_the_blank mb-5 card'><div class='card-header'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['fitbQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><div class='row'><p class='col-md-7 text-center'>" + messages['prompt'] + "</p><p class='col-md-4 text-center'>" + messages['answer'] + "</p></div><div class='row'><textarea rows='3' class='form-control col-md-7 mb-3 ml-3' placeholder='" + messages['fitbCreate'] + "'></textarea><input placeholder='" + messages['answer'] + ":' class='form-control col-md-4 mb-3 ml-3'></div></div></div>"
			matching = "<div class='matching mb-5 card'><div class='card-header mb-3'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['matchingQuestions'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><div class='form-group-vertical' id='matching_" + num_of_questions[2] + "'><div class='row'><a class='remove_choice'><i class='fa fa-times mt-2 ml-4' aria-hidden='true'></i></a><input class='form-control col-md-5 mb-3 ml-3 mr-4' placeholder='" + messages['leftChoice'] + "'><input class='form-control col-md-5 mb-3 ml-5' placeholder='" + messages['rightChoice'] + "'></div></div><button class='btn btn-outline-secondary pull-right add_choice' id='add_to_matching_" + num_of_questions[2] + "'>" + messages['addMatch'] + "</button></div></div>"
			essay = "<div class='essay mb-5 card'><div class='card-header mb-3'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['essayQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><textarea rows='6' class='form-control text-left col-md-12' placeholder='" + messages['essayPrompt'] + "'></textarea></div></div>"
			choice = "<a class='remove_choice'><i class='fa fa-times mt-2 ml-3' aria-hidden='true'></i></a><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label>";
			match_pair = "<a class='remove_choice'><i class='fa fa-times mt-2 ml-4' aria-hidden='true'></i></a><input class='form-control col-md-5 mb-3 ml-3 mr-4' placeholder='" + messages['leftChoice'] + "'><input class='form-control col-md-5 mb-3 ml-5' placeholder='" + messages['rightChoice'] + "'>";
    		this.question_type = $("#select_question_type").val();
    		if (this.question_type == 0) {
    			$('#all_questions').append(multiple_choice);
    			linkMC(num_of_questions[0]);
    			linkChoiceRemove();
    			linkQuestionRemove();
/*    			$('.multiple_choice_question').hide();
    			$('.multiple_choice_question').show(1000);*/
    			num_of_questions[0]++;
    		}
    		else if (this.question_type == 1) {
    			$('#all_questions').append(fill_in_the_blank);
    			linkQuestionRemove();
/*    			$('.multiple_choice_question').hide();
    			$('.multiple_choice_question').show(1000);*/
    			num_of_questions[1]++;
    		}
    		else if (this.question_type == 2) {
    			$('#all_questions').append(matching);
    			linkMatching(num_of_questions[2]);
    			linkChoiceRemove();
    			linkQuestionRemove();
/*    			$('.multiple_choice_question').hide();
    			$('.multiple_choice_question').show(1000);*/
    			num_of_questions[2]++;
    		}
    		else if (this.question_type == 3) {
    			$('#all_questions').append(essay);
    			linkQuestionRemove();
/*    			$('.multiple_choice_question').hide();
    			$('.multiple_choice_question').show(1000);*/
    			num_of_questions[3]++;
    		}
    		else {
    			console.log("false");
    		}
			scrollTo(0, document.body.scrollHeight)
    	},
    },
});


function linkMC(index) {
	$('#add_to_' + index).on('click', function (event) {
	var this_id = "multiple_choice_" + index;
	var elem = document.getElementById(this_id);
	var new_node = document.createElement("div");
	new_node.className = "row";
	new_node.innerHTML = choice;
	console.log(this_id, elem, new_node);	
	elem.appendChild(new_node);
	linkChoiceRemove();
	});
}

function linkMatching(index) {
	$('#add_to_matching_' + index).on('click', function (event) {
	var this_id = "matching_" + index;
	var elem = document.getElementById(this_id);
	var new_node = document.createElement("div");
	new_node.className = "row";
	new_node.innerHTML = match_pair;
	console.log(this_id, elem, new_node);	
	elem.appendChild(new_node);
	linkChoiceRemove();
	});
}

function linkChoiceRemove() {
	$('.remove_choice').on('click', function (event) {
		this.parentNode.parentNode.removeChild(this.parentNode);
	});
}

function linkQuestionRemove() {
	$('.remove_question').on('click', function (event) {
		this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
	});
}