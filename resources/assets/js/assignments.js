/**
 * Created by zyd on 17-7-19.
 */
const assignments = new Vue({
    el: '#assignments',
    data: {
        assignments: null,
    },
    mounted: function () {
        var self = this;
        axios.get('/assignments').then(
            function (res) {
                self.assignments = res.data;
            }
        )
    }

})