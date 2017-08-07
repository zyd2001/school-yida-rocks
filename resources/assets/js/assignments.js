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
                self.assignments = res.data;
            }
        )
    }
})