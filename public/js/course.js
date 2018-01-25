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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ({

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

if (window.location.pathname.search('courses/[0-9]+') !== -1) __webpack_require__(39);
if (window.location.pathname.search('courses/create') !== -1) __webpack_require__(40);

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

var course = new Vue({
    el: "#course",
    data: {
        avatar: ""
    }
});

course.avatar = $('#course_avatar').attr('src');

var uploader = new Qiniu.UploaderBuilder().debug(false).button('upload_button').domain({ http: "http://upload-z2.qiniu.com", https: "https://upload-z2.qbox.me" }).scheme('http').retry(0).compress(0.5).auto(true).multiple(true).tokenShare(true).tokenUrl('http://api.yida.rocks/qiniu/uptoken').listener({
    onReady: function onReady(tasks) {
        //该回调函数在图片处理前执行,也就是说task.file中的图片都是没有处理过的
        //选择上传文件确定后,该生命周期函数会被回调。
    },
    onStart: function onStart(tasks) {
        //所有内部图片任务处理后执行
        //开始上传
    },
    onTaskGetKey: function onTaskGetKey(task) {
        //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
        // console.log(task);
        // return task.file.name;

    },
    onTaskProgress: function onTaskProgress(task) {
        //每一个任务的上传进度,通过`task.progress`获取
        // console.log(task.speed);
    }, onTaskSuccess: function onTaskSuccess(task) {
        //一个任务上传成功后回调
        course.avatar = "http://ovnbee5ws.bkt.clouddn.com/" + task.result.key;
        // var course_id = document.getElementsbyTagName('meta')['id'];
        var course_id = $('meta[name=id]').attr('content');
        axios.patch('/courses/' + course_id, { avatar: course.avatar }).then(function (res) {
            showMessage(res.data.msg.content, res.data.msg.type);
        });
    },
    onTaskFail: function onTaskFail(task) {
        //一个任务在经历重传后依然失败后回调此函数

    },
    onTaskRetry: function onTaskRetry(task) {
        //开始重传

    },
    onFinish: function onFinish(tasks) {
        //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
    }
}).build();

/***/ }),

/***/ 40:
/***/ (function(module, exports) {



/***/ })

/******/ });