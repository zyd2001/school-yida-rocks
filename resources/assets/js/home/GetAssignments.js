/**
 * Created by zyd on 17-7-19.
 */
const assignments = new Vue({
    el: '#assignments',
    data: {
        assignments: null,
        status: 1,
        timeNow: null,
    },
    mounted: function () {
        var self = this;
        if ($('#assignments').length)
            axios.get('/assignments').then(
                function (res) {
                    if (res.data.length === 0)
                        self.status = 0;
                    for (var i in res.data) {
                        var dueTime = Date.parse(res.data[i].dueTime);
                        res.data[i].dueTime = res.data[i].dueTime.split('T');                        
                        try{
                            this.timeNow = Date.now();
                            console.log(dueTime - this.timeNow);
                            var diff = dueTime - this.timeNow;
                            if (diff > 0) {
                                res.data[i].dueTime['upcoming'] = 1;
                            }
                            else {
                                res.data[i].dueTime['upcoming'] = 0;                            
                            }
                            console.log(res.data[i].dueTime['upcoming']);
                        }catch (e){
                            console.log(e);
                        }                        
                        res.data[i].hoverMessage = '<img src="' + res.data[i].course.avatar + '" width="30" height="30">&nbsp;<a href="/courses/' + res.data[i].course.id + '">' + res.data[i].course.name + '</a>';
                    }
                    self.assignments = res.data;
                }
            );
    },
    methods: {
        show: function (event) {
            $(event.target).popover('show').on('shown.bs.popover', function () {
                $('.popover').on('mouseleave', function () {
                    $(event.target).popover('hide');
                })
            });
        },
        hide: function (event) {
            setTimeout(function () {
                if (!$('.popover:hover').length)
                    $(event.target).popover('hide');
            }, 100);
        }
    }
})