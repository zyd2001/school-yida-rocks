const content = new Vue({
    el: '.assignment_content',
    data: {
        questions: null,
    },
    methods: {
        fetch: function (event) {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            axios.get('/assignments/' + id + 'content').then(function (res) {
                self.questions = res.data;
            })
        }
    },
});