/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

if (window.location.pathname.search('assignments/[0-9]+') !== -1) {
    __webpack_require__(24);
    __webpack_require__(25);
    __webpack_require__(26);
}
if (window.location.pathname.search('create+') !== -1) __webpack_require__(27);

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

var description = new Vue({
    el: '#assignment_description',
    data: {
        isOpen: true,
        buttonText: 'Complete This Assignment'
    },
    methods: {},
    mounted: function mounted() {
        var aStatus = assignmentStatus();
        this.isOpen = aStatus['open'];
        this.buttonText = aStatus['msg'] ? aStatus['msg'] : 'Complete This Assignment';
    }
});

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

var content = new Vue({
    el: '#assignment_content',
    data: {
        questions: null,
        answer: null,
        matching: new Array(5),
        in_focus: false,
        choice_complete: false,
        current_index: 0
    },
    mounted: function mounted() {
        var id = document.getElementsByTagName('meta')['id'].content;
        var aStatus = assignmentStatus();
        if (aStatus['open']) {
            this.answer = localStorage.getItem('answer-' + id);
            if (this.answer) {
                showMessage('Detected saved answer locally, continuing', 1);
                this.fetch();
                this.$nextTick(function () {
                    this.answer = JSON.parse(this.answer);
                    fill();
                    window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
                });
            } else if (aStatus['gradeStatus'] == 2) {
                var self = this;
                showMessage('Detected saved answer on the server, continuing', 1);
                this.fetch();
                axios.get('/assignments/' + id + '/save').then(function (res) {
                    localStorage.setItem('answer-' + id, JSON.stringify(res.data));
                    self.$nextTick(function () {
                        self.answer = res.data;
                        fill();
                        window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
                    });
                });
            }
        }
    },
    methods: {
        fetch: function fetch() {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            var local = sessionStorage.getItem('questions-' + id);
            if (local) self.questions = JSON.parse(local);else axios.get('/assignments/' + id + '/questions').then(function (res) {
                self.questions = res.data;
                sessionStorage.setItem('questions-' + id, JSON.stringify(res.data));
            });
        },
        submit: function submit() {
            if (getAnswer()) {
                var id = document.getElementsByTagName('meta')['id'].content;
                localStorage.removeItem('answer-' + id);
                var form = document.getElementById('submit_form');
                form.children[0].value = JSON.stringify(this.answer);
                form.submit();
            } else {
                showMessage('Something went wrong!', 0);
            }
        },
        save: function save(type) {
            var self = this;
            var id = document.getElementsByTagName('meta')['id'].content;
            if (getAnswer()) {
                switch (type) {
                    case 0:
                        localStorage.setItem('answer-' + id, JSON.stringify(this.answer));
                        showMessage('Save successfully', 1);
                        break;
                    case 1:
                        axios.post('/assignments/' + id + '/save', { answer: JSON.stringify(self.answer) }).then(function (res) {
                            showMessage(res.data.msg.content, res.data.msg.type); //0=>danger, 1=>info
                        });
                        break;
                }
            } else {
                showMessage('Something went wrong!', 0);
            }
        },
        match: function match(event) {
            var current = $(event.target);
            var index = current.attr('index');
            var c = $('#canvas-' + index);
            if (!c.width()) {
                var w = c.parent().width();
                var h = c.parent().height();
                c[0].width = w;
                c[0].height = h;
            }
            var ctx = c[0].getContext('2d');
            var choices = $('a[index=' + index + '].disabled');
            current.addClass('disabled').siblings().addClass('disabled');
            choices.on('click', function (e) {
                var choice = $(e.target);
                var input = $('#' + index).contents('input[name=result]');
                var result = input.val();
                if (!result) result = [];else result = JSON.parse(result);
                result[current.attr('order')] = choice.attr('value');
                ctx.clearRect(0, 0, c.width(), c.height());
                ctx.strokeStyle = '#007bff';
                for (var i in result) {
                    if (result[i]) draw(ctx, $('[index=' + index + '][order=' + i + ']'), $('[index=' + index + '][value=' + result[i] + ']'), c);
                }
                choices.unbind('click');
                choices.addClass('disabled');
                current.removeClass('disabled').siblings().removeClass('disabled');
                result = JSON.stringify(result);
                input.val(result);
            });
            choices.removeClass('disabled');
        }
    }
});

$('#get_content').on('click', function (event) {
    content.fetch();
});

function getAnswer() {
    content.answer = [];
    var result;
    for (var i in content.questions) {
        var type = content.questions[i].type;
        switch (type) {
            case 0:
                var input = $('input[name=' + i + ']');
                var value = null;
                for (var j = 0; j < input.length; j++) {
                    if (input[j].checked) {
                        value = input[j].value;
                    }
                }
                content.answer[i] = value;
                break;
            case 1:
                /*not yet completed*/
                break;
            case 2:
                result = $('#' + i).contents('input[name=result]').val();
                content.answer[i] = result;
                break;
            case 3:
                result = $('#' + i).contents('textarea').val();
                content.answer[i] = result;
                break;
        }
    }
    return true;
}

function fill() {
    for (var i in content.answer) {
        if (!content.answer[i]) continue;
        switch (content.questions[i].type) {
            case 0:
                $('input[name=' + i + '][value=' + content.answer[i] + ']').attr('checked', true);
                break;
        }
    }
}

function draw(ctx, current, choice, c) {
    var prev = current.prevAll();
    var x1 = 0,
        x2 = c.width(),
        y1 = 0,
        y2 = 0;
    for (var i = 0; i < prev.length; i++) {
        y1 += $(prev[i]).height() + 7;
    }y1 += current.height() / 2.0 + 7;
    prev = choice.prevAll();
    for (var i = 0; i < prev.length; i++) {
        y2 += $(prev[i]).height() + 7;
    }y2 += choice.height() / 2.0 + 7;
    drawLine(ctx, x1, y1, x2, y2);
}

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

var grade = new Vue({
    el: '#assignment_grade',
    data: {
        answer: null,
        questions: null,
        correct: null
    },
    methods: {
        fetch: function fetch(event) {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            var questions = sessionStorage.getItem('questions-' + id);
            axios.get('/assignments/' + id + '/grade').then(function (res) {
                if (res.data.msg) showMessage(res.data.msg.content, res.data.msg.type);
                self.answer = JSON.parse(res.data.grade.answer);
                self.correct = JSON.parse(res.data.correct);
            });
            if (questions) self.questions = JSON.parse(questions);else axios.get('/assignments/' + id + '/questions').then(function (res) {
                self.questions = res.data;
                sessionStorage.setItem('questions-' + id, JSON.stringify(res.data));
            });
        }
    }
});

$('#get_detail').on('click', function (event) {
    grade.fetch();
});

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

if (window.innerWidth <= 800) showMessage('Please use PC or tablet', 0);

// var messages[];
// messages['multipleChoiceQuestion'] = $('span[name=multipleChoiceQuestion]').text();
/*var multiple_choice = $('.multiple_choice')[0];
var fill_in_the_blank = $('.fill_in_the_blank')[0];
var matching = $('.matching')[0];
var essay = $('.essay')[0];
$('.card').addClass('hidden');*/
// var messages = new Array();
var template = [];
$(function () {
    var temp = $('.question');
    template['questions'] = temp.clone();
    template['choice'] = $('#multiple_choice_choice').clone();
    template['pair'] = $('#matching_pair').clone();
    temp.remove();
});
// for (var i = 0; i < num_of_questions.length; i++) {
// 	num_of_questions[i] = 1;
// }

// messages['multipleChoiceQuestion'] = $('span[name=multipleChoiceQuestion]').text();
// messages['fitbQuestion'] = $('span[name=fitbQuestion]').text();
// messages['matchingQuestions'] = $('span[name=matchingQuestions]').text();
// messages['essayQuestion'] = $('span[name=essayQuestion]').text();
// messages['leftChoice'] = $('span[name=leftChoice]').text();
// messages['rightChoice'] = $('span[name=rightChoice]').text();
// messages['essayPrompt'] = $('span[name=essayPrompt]').text();
// messages['choices'] = $('span[name=choices]').text();
// messages['prompt'] = $('span[name=prompt]').text();
// messages['answer'] = $('span[name=answer]').text();
// messages['fitbCreate'] = $('span[name=fitbCreate]').text();
// messages['correct'] = $('span[name=correct]').text();
// messages['choice'] = $('span[name=choice]').text();
// messages['addChoice'] = $('span[name=addChoice]').text();
// messages['addMatch'] = $('span[name=addMatch]').text();

// messages['multipleChoiceCreate'] = $('span[name=multipleChoiceCreate]').text();
// var multiple_choice = "<div class='multiple_choice_question mb-5 card'><div class='card-header'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['multipleChoiceQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><textarea rows='5' class='form-control col-md-12' placeholder='" + messages['multipleChoiceCreate'] + "'></textarea><div class='row'><p class='col-md-10 text-center'>" + messages['choices'] + "</p><p class='col-md-2 text-center'>" + messages['correct'] + "</p></div><div id='multiple_choice_" + num_of_questions[0] + "'><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div><div class='row'><i class='remove_choice fa fa-times mt-2 ml-3' aria-hidden='true'></i><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label></div></div><button class='btn btn-outline-secondary pull-right add_choice' id='add_to_" + num_of_questions[0] + "'>" + messages['addChoice'] + "</button></div></div>";
// var fill_in_the_blank = "<div class='fill_in_the_blank mb-5 card'><div class='card-header'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['fitbQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><div class='row'><p class='col-md-7 text-center'>" + messages['prompt'] + "</p><p class='col-md-4 text-center'>" + messages['answer'] + "</p></div><div class='row'><textarea rows='3' class='form-control col-md-7 mb-3 ml-3' placeholder='" + messages['fitbCreate'] + "'></textarea><input placeholder='" + messages['answer'] + ":' class='form-control col-md-4 mb-3 ml-3'></div></div></div>"
// var matching = "<div class='matching mb-5 card'><div class='card-header mb-3'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['matchingQuestions'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><div class='form-group-vertical' id='matching_" + num_of_questions[2] + "'><div class='row'><a class='remove_choice'><i class='fa fa-times mt-2 ml-4' aria-hidden='true'></i></a><input class='form-control col-md-5 mb-3 ml-3 mr-4' placeholder='" + messages['leftChoice'] + "'><input class='form-control col-md-5 mb-3 ml-5' placeholder='" + messages['rightChoice'] + "'></div></div><button class='btn btn-outline-secondary pull-right add_choice' id='add_to_matching_" + num_of_questions[2] + "'>" + messages['addMatch'] + "</button></div></div>"
// var essay = "<div class='essay mb-5 card'><div class='card-header mb-3'><div class='row'><a class='remove_question'><i class='fa fa-times mt-1 ml-3 mr-3' aria-hidden='true'></i></a><h5>" + messages['essayQuestion'] + "</h5></div></div><div class='card-body'><textarea rows='5' class='form-control col-md-12' style='display: none'></textarea><textarea rows='6' class='form-control text-left col-md-12' placeholder='" + messages['essayPrompt'] + "'></textarea></div></div>"
// var choice = "<a class='remove_choice'><i class='fa fa-times mt-2 ml-3' aria-hidden='true'></i></a><input placeholder='" + messages['choice'] + "' class='form-control col-md-10 mb-3 ml-2'><label class='custom-control custom-checkbox ml-5'><input type='checkbox' class='custom-control-input col-md-2'><span class='custom-control-indicator'></span><span class='custom-control-description'></span></label>";
function bindRemove() {
    $('.remove_question').on('click', function (event) {
        $(event.target).parents('.question').hide('fast', function () {
            $(this).remove();
        });
    });
    $('.remove_choice').on('click', function (event) {
        $(event.target).parents('.row').hide('fast', function () {
            $(this).remove();
        });
    });
}

// var match_pair = "<a class='remove_choice'><i class='fa fa-times mt-2 ml-4' aria-hidden='true'></i></a><input class='form-control col-md-5 mb-3 ml-3 mr-4' placeholder='" + messages['leftChoice'] + "'><input class='form-control col-md-5 mb-3 ml-5' placeholder='" + messages['rightChoice'] + "'>";
var create = new Vue({
    el: '#create',
    data: {
        select_question_type: 0,
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        questions: {},
        correct: [],
        index: 0,
        amount: 1
    },
    mounted: function mounted() {},
    methods: {
        submit: function submit() {
            var questions = $('.question');
            for (var i = 0; i < questions.length; i++) {
                var temp = $(questions[i]);
                var type = temp.attr('type');
                switch (Number(type)) {
                    case 0:
                        this.correct[i] = [];
                        this.questions[i] = { 'answer': {} };
                        this.questions[i].question = temp.find('textarea').val();
                        this.questions[i].type = 0;
                        this.questions[i].option = null;
                        var choices = temp.find('.choice').children();
                        if (choices.length > 52) showMessage('Too much choices in question' + i + 1, 0);
                        for (var j = 0; j < choices.length; j++) {
                            var input = $(choices[j]).find('input');
                            this.questions[i].answer[this.alphabet[j]] = input[0].value;
                            if (input[1].checked) this.correct[i].push(this.alphabet[j]);
                        }
                        break;
                    case 1:
                        this.questions[i] = {};
                        this.questions[i].question = temp.find('textarea').val();
                        this.correct[i] = temp.find('input').val();
                        this.questions[i].type = 1;
                        this.questions[i].option = null;
                        break;
                    case 2:
                        this.correct[i] = null;
                        this.questions[i] = { 'answer': {} };
                        this.questions[i].question = { 'content': {} };
                        this.questions[i].question.title = temp.find('textarea').val();
                        this.questions[i].type = 2;
                        this.questions[i].option = null;
                        // if (choices.length > 26)
                        //     showMessage('Too much pairs in question' + i + 1, 0);
                        var pairs = temp.find('.pairs').children();
                        for (var j = 0; j < pairs.length; j++) {
                            var input = $(pairs[j]).find('input');
                            this.questions[i].question.content[j] = input[0].value;
                            this.questions[i].answer[j] = input[1].value;
                            // this.correct[i].push(this.alphabet[j])
                        }
                        break;
                    case 3:
                        this.questions[i] = {};
                        this.correct[i] = null;
                        this.questions[i].question = temp.find('textarea').val();
                        this.questions[i].type = 3;
                        this.questions[i].option = null;
                        break;
                }
            }
            var form = document.getElementById('submit_form');
            form.children[1].value = JSON.stringify(this.questions);
            form.children[2].value = JSON.stringify(this.correct);
            form.children[3].value = "{\"open\":true,\"attempt\":3}";
            form.submit();
        },
        addQuestion: function addQuestion() {
            var root = $('#all_questions');
            for (var i = 0; i < this.amount; i++) {
                root.append($(template['questions'][this.select_question_type]).clone().attr('index', this.index));
                this.index++;
            }
            bindRemove();
            $('.add_choice').on('click', function (event) {
                var type = $(event.target).parents('.card').attr('type');
                switch (Number(type)) {
                    case 0:
                        $(event.target).prev().append(template['choice'].clone());
                        break;
                    case 2:
                        $(event.target).siblings('.form-group-vertical').append(template['pair'].clone());
                        break;
                }
                bindRemove();
            });
        }
    }
});
// function linkMC(index) {
//     $('#add_to_' + index).on('click', function (event) {
//         var this_id = "multiple_choice_" + index;
//         var elem = document.getElementById(this_id);
//         var new_node = document.createElement("div");
//         new_node.className = "row";
//         new_node.innerHTML = choice;
//         console.log(this_id, elem, new_node);
//         elem.appendChild(new_node);
//         linkChoiceRemove();
//     });
// }
//
// function linkMatching(index) {
//     $('#add_to_matching_' + index).on('click', function (event) {
//         var this_id = "matching_" + index;
//         var elem = document.getElementById(this_id);
//         var new_node = document.createElement("div");
//         new_node.className = "row";
//         new_node.innerHTML = match_pair;
//         console.log(this_id, elem, new_node);
//         elem.appendChild(new_node);
//         linkChoiceRemove();
//     });
// }
//
// function linkChoiceRemove() {
//     $('.remove_choice').on('click', function (event) {
//         this.parentNode.parentNode.removeChild(this.parentNode);
//     });
// }
//
// function linkQuestionRemove() {
//     $('.remove_question').on('click', function (event) {
//         this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
//     });
// }

/***/ })

/******/ });