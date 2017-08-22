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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ({

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(52);


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53);

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);

/***/ }),

/***/ 54:
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
            for (var i in res.data) {
                res.data[i].hoverMessage = '<img src="' + res.data[i].course.avatar + '" width="30" height="30">&nbsp;<a href="/courses/' + res.data[i].course.id + '">' + res.data[i].course.name + '</a>';
                res.data[i].dueTime = res.data[i].dueTime.split(' ');
            }
            self.assignments = res.data;
        }).catch(ajaxError(err));
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

/***/ })

/******/ });