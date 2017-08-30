// /**
//  * Created by zyd on 17-7-18.
//  */
//
// const getCourses = new Vue({
//     el: '#course',
//     data: {
//         courses: ''
//     },
//     methods: {
//         get: function (event) {
//             if (this.courses === '') {
//                 this.courses = '<span class="dropdown-item">Loading...</span>';
//                 var self = this;
//                 axios.get('/courses/getCourses')
//                     .then(function (res) {
//                         self.courses = '';
//                         for (var i in res.data) {
//                             var course = res.data[i];
//                             self.courses += '<a class="dropdown-item h5" href="/courses/' + course.id + '">'
//                                 + '<img src="' + course.avatar + '" alt="' + course.name + '">&nbsp;' + course.name + '</a>';
//                         }
//                         if (self.courses === '')
//                             self.courses = '<a href="#" class="dropdown-item" data-toggle="modal" data-target="#joinModal">No Courses, join one</a>';
//                     })
//                     .catch(function (err) {
//                         console.log(err);
//                     })
//             }
//         }
//     }
// })

const header = new Vue({
    el: '#header',
    data: {
        courses: null,
        messageAmount: 0,
    },
    methods: {
        getMessageAmount: function (updated) {
            if (updated === true)
                sessionStorage.removeItem('messageAmount');
            var self = this;
            this.messageAmount = sessionStorage.getItem('messageAmount');
            if (!this.messageAmount)
                axios.get('/messages/amount').then(function (res) {
                    self.messageAmount = res.data.amount;
                    sessionStorage.setItem('messageAmount', res.data.amount);
                });
        },
        getCourses: function (updated) {
            if (updated === true)
                sessionStorage.removeItem('courses');
            if (!this.courses) {
                this.courses = sessionStorage.getItem('courses');
                if (!this.courses) {
                    var self = this;
                    axios.get('/courses/getCourses')
                        .then(function (res) {
                            self.courses = res.data;
                            if (!res.data.length)
                                sessionStorage.setItem('courses', JSON.stringify(res.data));
                        })
                }
            }
        },
    }
});

function expose() {
    vue['header'] = header;
}

expose();