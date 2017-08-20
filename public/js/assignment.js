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
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ({

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(46);


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);
__webpack_require__(49);

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

var description = new Vue({
    el: '.assignment_description',
    data: {},
    methods: {},
    mounted: function mounted() {}
});

/***/ }),

/***/ 49:
/***/ (function(module, exports) {

var content = new Vue({
    el: '.assignment_content',
    data: {
        questions: null
    },
    methods: {
        fetch: function fetch() {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            axios.get('/assignments/' + id + '/content').then(function (res) {
                self.questions = JSON.parse(res.data);
            });
        },
        submit: function submit() {

            var result = new Array();
            for (var i in this.questions) {
                var question = $('#' + i);
                var type = question.attr('type');
                switch (type) {
                    case '0':
                        var input = question.contents('span');
                        var value = null;
                        for (var j = 0; j < input.length; j++) {
                            if (input[j].children[0].checked) {
                                value = input[j].children[0].value;
                            }
                        }
                        result[i] = value;
                        break;
                    case '1':
                        break;
                }
            }
            var form = document.getElementById('submit_form');
            form.children[0].value = JSON.stringify(result);
            form.submit();
        }
    }
});

$('#get_content').on('click', function (event) {
    content.fetch();
});

/***/ })

/******/ });