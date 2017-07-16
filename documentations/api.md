# 后端接口

`/setLocale`：get方法，请求中必须有locale字段，值为`en`或者`zh`，没有post方法

`/verify`：post方法，请求中需要有code字段；get方法返回一个验证码页面verify.blade.php（这个可以改）

`/assignments/id`：post方法，这里的id是assignment的id，请求中只需要一个answer字段，是一个json字符串，包含答案；get方法返回一个指定id的assignment页面

`/assignments`：post方法，这个url没有get方法，content的格式见`http://orjf65xeb.bkt.clouddn.com/json_schema`

|可接受字段|作用|格式|是否必须|
|-|:--|:-|:-|
|name|assignment的名字|string|是|
|course_id|assignment所属的course|integer|是|
|content|内容|json|是|
|dueTime|截止日期|time|是|
|setting|设置|json|否|
get方法，返回一个json字符串，每一项包含`id`, `name`, `dueTime`和所属course的信息（只返回尚未完成的assignment）

`/courses/id/getFiles`：get方法，id是course的id，返回一个文件结构的json字符串

`/courses/getCourses`：get方法，获得所有当前用户加入过的course

`/grades`：get方法，获得当前用户的所有grade