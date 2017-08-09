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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ({

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39);


/***/ }),

/***/ 39:
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

__webpack_require__(40);
__webpack_require__(45);

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(44);

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

/**
 * Created by zyd on 17-7-18.
 */
$(function () {
    if (window.innerWidth <= 768) {
        $('nav').removeClass('container');
        $('#footer-lg').addClass('hidden');
        $('#footer-sm').removeClass('hidden');
    }
});

$(window).resize(function () {
    if (window.innerWidth <= 768) {
        $('nav').removeClass('container');
        $('#footer-lg').addClass('hidden');
        $('#footer-sm').removeClass('hidden');
    } else {
        $('nav').addClass('container');
        $('#footer-lg').removeClass('hidden');
        $('#footer-sm').addClass('hidden');
    }
});

/***/ }),

/***/ 42:
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

var getCourses = new Vue({
    el: '#course',
    data: {
        courses: null,
        status: 0
    },
    methods: {
        get: function get(event) {
            if (this.courses === null) {
                var self = this;
                this.status = 2; //processing
                axios.get('/courses/getCourses').then(function (res) {
                    self.courses = res.data;
                    self.status = 1;
                    if (!res.data.length) self.status = 3; //no data
                }).catch(function (err) {
                    console.log(err);
                    self.status = 4;
                    self.courses = 'error';
                });
            }
        }
    }
});

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

/**
 * Created by zyd on 17-7-19.
 */
$(function () {
    var messageModal = $('#messageModal');
    if (messageModal.length) {
        messageModal.modal('show');
        window.setTimeout("$('#messageModal').modal('hide')", 2000);
    }
});

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

/**
 * Created by zyd on 17-7-19.
 */
var assignments = new Vue({
    el: '#assignments',
    data: {
        assignments: null,
        status: 1
    },
    mounted: function mounted() {
        var self = this;
        if ($('#assignments').length) axios.get('/assignments').then(function (res) {
            if (res.data.length === 0) self.status = 0;
            console.log(JSON.stringify(res.data[0].course.avatar, null, 2));
            for (var i in res.data) {
                res.data[i].hoverMessage = '<img src="' + res.data[i].course.avatar + '" width="30" height="30">&nbsp;<a href="courses/' + res.data[i].course.id + '">' + res.data[i].course.name + '</a>';
            }
            self.assignments = res.data;
        });
    },
    methods: {
        show: function show(event) {
            $(event.target).popover('show').on('shown.bs.popover', function () {
                $('.popover').on('mouseleave', function () {
                    $(event.target).popover('hide');
                });
            });
        },
        hide: function hide(event) {
            setTimeout(function () {
                if (!$('.popover:hover').length) $(event.target).popover('hide');
            }, 100);
        }
    }
});

/***/ }),

/***/ 45:
/***/ (function(module, exports) {



/***/ })

/******/ });