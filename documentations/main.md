# 后端接口

`/setLocale` : get方法，请求中必须有locale字段，值为`en`或者`zh`，没有post方法

`/assignments` : post方法，这个url没有get方法，content的格式见`http://orjf65xeb.bkt.clouddn.com/json_schema`

|可接受字段|作用|格式|是否必须|
|-|:--|:-|:-|
|name|作业的名字|string|是|
|course_id|作业所属的课|integer|是|
|content|内容|json|是|
|dueTime|截止日期|time|是|
|setting|设置|json|否|

`/assignments/getAssignments` ： get方法，返回一个json字符串，每一项包含`id`, `name`, `dueTime`和所属课程的信息