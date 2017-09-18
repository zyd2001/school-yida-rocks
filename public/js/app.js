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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

__webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * Created by zyd on 17-7-18.
 */
$(function () {
    if (window.innerWidth <= 768) {
        $('#nav').removeClass('container').addClass('container-fluid');
        $('.footer-lg').addClass('hidden');
        $('.footer-sm').removeClass('hidden');
    }
});

$(window).resize(function () {
    if (window.innerWidth <= 768) {
        $('#nav').removeClass('container').addClass('container-fluid');
        $('.footer-lg').addClass('hidden');
        $('.footer-sm').removeClass('hidden');
    } else {
        $('#nav').removeClass('container-fluid').addClass('container');
        $('.footer-lg').removeClass('hidden');
        $('.footer-sm').addClass('hidden');
    }
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// /**
//  * Created by zyd on 17-7-18.
//  */
//
// const getCourses = new Vue({
//     el: '#course',
//     data: {
//         courses: ''
//     },
//     methods: {
//         get: function (event) {
//             if (this.courses === '') {
//                 this.courses = '<span class="dropdown-item">Loading...</span>';
//                 var self = this;
//                 axios.get('/courses/getCourses')
//                     .then(function (res) {
//                         self.courses = '';
//                         for (var i in res.data) {
//                             var course = res.data[i];
//                             self.courses += '<a class="dropdown-item h5" href="/courses/' + course.id + '">'
//                                 + '<img src="' + course.avatar + '" alt="' + course.name + '">&nbsp;' + course.name + '</a>';
//                         }
//                         if (self.courses === '')
//                             self.courses = '<a href="#" class="dropdown-item" data-toggle="modal" data-target="#joinModal">No Courses, join one</a>';
//                     })
//                     .catch(function (err) {
//                         console.log(err);
//                     })
//             }
//         }
//     }
// })

var header = new Vue({
    el: '#header',
    data: {
        courses: null,
        messageAmount: 0
    },
    methods: {
        getMessageAmount: function getMessageAmount(updated) {
            if (updated === true) sessionStorage.removeItem('messageAmount');
            var self = this;
            this.messageAmount = sessionStorage.getItem('messageAmount');
            if (!this.messageAmount) axios.get('/messages/amount').then(function (res) {
                self.messageAmount = res.data.amount;
                sessionStorage.setItem('messageAmount', res.data.amount);
            });
        },
        getCourses: function getCourses(updated) {
            if (updated === true) sessionStorage.removeItem('courses');
            if (!this.courses) {
                this.courses = sessionStorage.getItem('courses');
                if (!this.courses) {
                    var self = this;
                    axios.get('/courses/getCourses').then(function (res) {
                        self.courses = res.data;
                        if (!res.data.length) sessionStorage.setItem('courses', JSON.stringify(res.data));
                    });
                } else {
                    this.courses = JSON.parse(this.courses);
                }
            }
        }
    }
});

function expose() {
    vue['header'] = header;
}

expose();

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Created by zyd on 17-7-19.
 */
$(function () {
    var danger = $('#message_danger');
    var info = $('#message_info');
    if ($.trim(danger.contents().contents('.alert').html())) {
        danger.modal('show');
        window.setTimeout("$('#message_danger').modal('hide')", 2000);
    }
    if ($.trim(info.contents().contents('.alert').html())) {
        info.modal('show');
        window.setTimeout("$('#message_info').modal('hide')", 2000);
    }
});

/***/ })
/******/ ]);