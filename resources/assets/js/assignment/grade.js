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
            var questions = sessionStorage.getItem('questions-' + id);
            axios.get('/assignments/' + id + '/grade').then(function (res) {
                if (res.data.msg)
                    showMessage(res.data.msg.content, res.data.msg.type);
                self.answer = res.data.answer;
                self.correct = JSON.parse(res.data.correct);
            });
            if (questions)
                self.questions = JSON.parse(questions);
            else
                axios.get('/assignments/' + id + '/questions').then(function (res) {
                    self.questions = res.data;
                    sessionStorage.setItem('questions-' + id, JSON.stringify(res.data));
                })
        },
    },
});

$('#get_detail').on('click', function (event) {
    grade.fetch();
});