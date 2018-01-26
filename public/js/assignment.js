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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26);

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

if (window.location.pathname.search('assignments/[0-9]+') !== -1) {
    __webpack_require__(27);
    __webpack_require__(28);
    __webpack_require__(29);
}
if (window.location.pathname.search('create+') !== -1) __webpack_require__(30);

/***/ }),

/***/ 27:
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

/***/ 28:
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

/***/ 29:
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

/***/ 30:
/***/ (function(module, exports) {

if (window.innerWidth <= 800) showMessage('Please use PC or tablet', 0);

var template = [];
$(function () {
    var temp = $('.question');
    template['questions'] = temp.clone();
    template['choice'] = $('#multiple_choice_choice').clone();
    template['pair'] = $('#matching_pair').clone();
    template['blank'] = $('#fitb_blank').clone();
    template['questions']['multiple_choice'] = template['questions'][0];
    template['questions']['fill_in_the_blank'] = template['questions'][1];
    template['questions']['matching'] = template['questions'][2];
    template['questions']['short_answer'] = template['questions'][3];
    $(template['questions'][1]).children('#fitb_blank').remove();
    $(template['questions'][0]).find('#multiple_choice_choice').remove();
    temp.remove();
});

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
    $('.remove_blank').on('click', function (event) {
        $(event.target).parent().hide('fast', function () {
            $(this).remove();
        });
    });
}

var create = new Vue({
    el: '#create',
    data: {
        select_question_type: 'multiple_choice',
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        questions: {},
        correct: [],
        index: 0,
        amount: 1
    },
    mounted: function mounted() {},
    methods: {
        submit: function submit() {
            var settings = $('.settings');
            for (var i = 0; i < settings.length; i++) {
                if ($(settings[i]).val().length === 0) {
                    showMessage('settings', 0);
                    return;
                }
            }
            var questions = $('.question');
            for (var i = 0; i < questions.length; i++) {
                var temp = $(questions[i]);
                var type = temp.attr('type');
                switch (type) {
                    case 'multiple_choice':
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
                        break; //Case 0: MCQ

                    case 'fill_in_the_blank':
                        this.questions[i] = {};
                        this.questions[i].question = temp.find('textarea').val();
                        this.correct[i] = temp.find('input').val();
                        this.questions[i].type = 1;
                        this.questions[i].option = null;
                        break; //Case 1: Fill-in-the-blank Questions

                    case 'matching':
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
                        break; //Case 2: Matching Questions

                    case 'short_answer':
                        this.questions[i] = {};
                        this.correct[i] = null;
                        this.questions[i].question = temp.find('textarea').val();
                        this.questions[i].type = 3;
                        this.questions[i].option = null;
                        break; //Case 3: Short Answer Question
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
                var newNode = $(template['questions'][this.select_question_type]).clone().attr('index', this.index);
                if (this.select_question_type == 'fill_in_the_blank') newNode.children().children('.fitb_prompt').on('keydown', function (event) {
                    switch (event.originalEvent.key) {
                        case 'BackSpace':
                        case 'Enter':
                            break;
                    }
                });
                if (this.select_question_type == 'multiple_choice') {
                    newNode.attr('count', 4);
                    for (var i = 0; i < 4; i++) {
                        var id = this.index + '_' + i;
                        console.log(id);
                        var temp = template['choice'].clone();
                        temp.find('.custom-control-input').attr('id', id);
                        temp.find('.custom-control-label').attr('for', id);
                        newNode.find('.choice').append(temp);
                    }
                }
                root.append(newNode);
                this.index++;
            }
            bindRemove();
            $('.add_choice').on('click', function (event) {
                var type = $(event.target).parents('.card').attr('type');
                switch (type) {
                    case 'multiple_choice':
                        var questionIndex = $(event.target).parents('.question').attr('index');
                        var choiceIndex = $(event.target).parents('.question').attr('count');
                        console.log(questionIndex + " " + choiceIndex);
                        var temp = template['choice'].clone();
                        var id = questionIndex + '_' + choiceIndex;
                        temp.find('.custom-control-input').attr('id', id);
                        console.log(temp.find('.custom-control-input').attr('id'));
                        temp.find('.custom-control-label').attr('for', id);
                        $(event.target).prev().append(temp);
                        choiceIndex++;
                        $(event.target).parents('.question').attr('count', choiceIndex);
                        break;
                    case 'fill_in_the_blank':
                        var selection = getSelection();
                        var anchorNodeIndex = event.target.childNodes.indexOf(selection.anchorNode);
                        if (anchorNodeIndex === -1) {
                            showMessage('Please set ...', 0);
                            break;
                        } else {
                            if (selection.isCollapsed) {
                                event.target.childNodes[anchorNodeIndex];
                            } else {}
                            $(event.target).parents('.blanks').append(template['blank'].clone().attr('hidden', false).on('input', function () {
                                // sync the input

                            }));
                            break;
                        }
                    case 'matching':
                        $(event.target).siblings('.form-group-vertical').append(template['pair'].clone());
                        break;
                }
                bindRemove();
            });
        }
    }
});

/***/ })

/******/ });