/**
 * Created by zyd on 17-7-18.
 */

const getCourses = new Vue({
    el: '#course',
    data: {
        courses: ''
    },
    methods: {
        get: function (event) {
            if (this.courses === '') {
                this.courses = 'Loading...';
                var self = this;
                axios.get('/courses/getCourses')
                    .then(function (res) {
                        self.courses = '';
                        for (var i in res.data) {
                            var course = res.data[i];
                            self.courses += '<a class="dropdown-item h5" href="/courses/' + course.id + '">'
                                + '<img src="' + course.avatar + '" alt="' + course.name + '">' + course.name + '</a>';
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }
        }
    }
})