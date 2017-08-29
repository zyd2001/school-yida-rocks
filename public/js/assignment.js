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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ({

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(47);


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(51);

/***/ }),

/***/ 49:
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

/***/ 50:
/***/ (function(module, exports) {

var content = new Vue({
    el: '#assignment_content',
    data: {
        questions: null,
        answer: null
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
        }
    }
});

$('#get_content').on('click', function (event) {
    content.fetch();
});

function getAnswer() {
    content.answer = [];
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

/***/ }),

/***/ 51:
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

/***/ })

/******/ });