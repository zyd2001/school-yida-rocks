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
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ({

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(32);


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

if (window.location.pathname === '/home') __webpack_require__(34);
if (window.location.pathname.search('setting+') !== -1) __webpack_require__(35);

/***/ }),

/***/ 34:
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

/***/ 35:
/***/ (function(module, exports) {

var setting = new Vue({
    el: '#setting',
    data: {
        password: '',
        passwordConfirm: '',
        description: '',
        firstName: '',
        lastName: '',
        match: null,
        user_avatar: ""
    },
    methods: {
        reset: function reset() {
            var self = this;
            if (this.password !== this.passwordConfirm) this.match = false;else axios.post('/home/setting/resetPassword', {
                password: this.password
            }).then(function (res) {
                showMessage(res.data.msg.content, res.data.msg.type);
            });
        },
        saveDescription: function saveDescription() {
            showMessage('Do not use this', 0);
            // var self = this;
            // axios.patch('/home/setting/', {
            //     description: this.description,
            // }).then(function (res) {
            //     showMessage(res.data.msg.content, res.data.msg.type);
            // })
        },
        saveName: function saveName() {
            var self = this;
            axios.patch('/home/setting/', {
                name: this.firstName + " " + this.lastName
            }).then(function (res) {
                showMessage(res.data.msg.content, res.data.msg.type);
            });
        }
    }
});

setting.user_avatar = $('#user_avatar_display').attr('src');

var uploader = new Qiniu.UploaderBuilder().debug(false).button('upload_user_avatar').domain({ http: "http://upload-z2.qiniu.com", https: "https://upload-z2.qbox.me" }).scheme('http').retry(0).compress(0.5).auto(true).multiple(true).tokenShare(true).tokenUrl('http://api.yida.rocks/qiniu/uptoken').listener({
    onReady: function onReady(tasks) {
        //该回调函数在图片处理前执行,也就是说task.file中的图片都是没有处理过的
        //选择上传文件确定后,该生命周期函数会被回调。
        console.log(tasks);
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
        setting.user_avatar = "http://ovnbee5ws.bkt.clouddn.com/" + task.result.key;
        // var course_id = document.getElementsbyTagName('meta')['id'];
        var user_id = $('meta[name=id]').attr('content');
        axios.patch('/home/setting/' + user_id, { avatar: setting.user_avatar }).then(function (res) {
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

/***/ })

/******/ });