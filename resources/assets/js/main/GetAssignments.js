/**
 * Created by zyd on 17-7-19.
 */
const assignments = new Vue({
    el: '#assignments',
    data: {
        assignments: null,
        status: 1,
    },
    mounted: function () {
        var self = this;
        if ($('#assignments').length)
            axios.get('/assignments').then(
                function (res) {
                    if (res.data.length === 0)
                        self.status = 0;
                    console.log(JSON.stringify(res.data[0].course.avatar, null, 2))
                    for (var i in res.data) {
                        res.data[i].hoverMessage = '<img src="' + res.data[i].course.avatar + '" width="30" height="30">&nbsp;<a href="courses/' + res.data[i].course.id + '">' + res.data[i].course.name + '</a>';
                    }
                    self.assignments = res.data;
                }
            )
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