# 后端接口

`/setLocale`：get方法，请求中必须有locale字段，值为`en`或者`zh`，没有post方法

`/verify`：post方法，请求中需要有code字段；get方法返回一个验证码页面verify.blade.php（这个可以改）

`/assignments/id`：post方法，这里的id是assignment的id，请求中只需要一个answer字段，是一个json字符串，包含答案；get方法返回一个指定id的assignment页面

`/assignments`：get方法，返回一个json字符串，每一项包含`id`, `name`, `dueTime`和所属course的信息（只返回尚未完成的assignment）；post方法，添加一个assignment

|可接受字段|作用|格式|可选值|是否必须|
|-|:--|:-|:-|:-|
|name|assignment的名字|string|any|是|
|course_id|assignment所属的course|integer|any|是|
|content|内容|json|any|是|
|dueTime|截止日期|time|any|是|
|setting|设置|json|any|否|
content的格式见`http://orjf65xeb.bkt.clouddn.com/json_schema`

`/courses/id/files`：get方法，id是course的id，返回一个文件结构的json字符串

`/courses/id/assignments`：get方法，返回当前用户在指定id的course里所有assignment

`/courses/getCourses`：get方法，获得所有当前用户加入过的course

`/grades`：get方法，获得当前用户的所有grade

`/files/id`：get方法，返回指定id文件的`url`和`name`

`/courses`：post方法，创建一个course，需要有`name`，`avatar`，`public`，`setting`，`type`字段

|可接受字段|作用|格式|可选值|是否必须|
|-|:--|:-|:-|:-|
|name|名字|string|any|是|
|avatar|头像url|string|any|否|
|public|是否公开|boolean|true or false|否|
|setting|设置|json|any|否|
|type|类型|integer|0，1，2|否|