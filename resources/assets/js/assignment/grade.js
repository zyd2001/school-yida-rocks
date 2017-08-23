const grade = new Vue({
    el: '#assignment_grade',
    data: {
        answer: null,
        questions: null,
        correct: null,
    },
    methods: {
        fetch: function (event) {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            var questions = sessionStorage.getItem('questions');
            axios.get('/assignments/' + id + '/grade').then(function (res) {
                self.answer = res.data.answer;
                self.correct = res.data.correct;
            });
            if (questions)
                self.questions = JSON.parse(questions);
            else
                axios.get('/assignments/' + id + '/questions').then(function (res) {
                    self.questions = res.data;
                    sessionStorage.questions = JSON.stringify(res.data);
                }).catch(function (err) {
                    ajaxError(err);
                });
        },
    },
});