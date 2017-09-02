const course = new Vue({
	el: "#course",
	data: {
		avatar: "",
	},
});

course.avatar = $('#course_avatar').attr('src');

var uploader = new Qiniu.UploaderBuilder()
.debug(false)
.button('upload_button')
.domain({http : "http://upload-z2.qiniu.com", https: "https://upload-z2.qbox.me"})
.scheme('http')
.retry(0)
.compress(0.5)
.auto(true)
.multiple(true)
.tokenShare(true)
.tokenUrl('http://api.yida.rocks/qiniu/uptoken')
.listener({
    onReady(tasks) {
        //该回调函数在图片处理前执行,也就是说task.file中的图片都是没有处理过的
        //选择上传文件确定后,该生命周期函数会被回调。
        console.log(tasks);
    },onStart(tasks){
        //所有内部图片任务处理后执行
        //开始上传
        console.log(tasks);
    },onTaskGetKey(task){
        //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
        // console.log(task);
        // return task.file.name;
        
    },onTaskProgress: function (task) {
        //每一个任务的上传进度,通过`task.progress`获取
        // console.log(task.speed);
    },onTaskSuccess(task){
        //一个任务上传成功后回调
        console.log(task);
        console.log(task.result.key);//文件的key
        console.log(task.result.hash);//文件hash
        course.avatar = "http://ovnbee5ws.bkt.clouddn.com/" + task.result.key;
        // var course_id = document.getElementsbyTagName('meta')['id'];
		var course_id = $('meta[name=id]').attr('content');
		axios.patch('/courses/' + course_id, {avatar:course.avatar}).then(showMessage("Successfully saved", 1))

    },onTaskFail(task) {
        //一个任务在经历重传后依然失败后回调此函数
        
    },onTaskRetry(task) {
        //开始重传
        
    },onFinish(tasks){
        //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
        console.log(tasks);
    }})
.build();
