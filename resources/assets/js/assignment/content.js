const content = new Vue({
    el: '#assignment_content',
    data: {
        questions: null,
        answer: null,
    },
    mounted: function () {
        var id = document.getElementsByTagName('meta')['id'].content;
        this.answer = localStorage.getItem('answer-' + id);
        if (this.answer) {
            showMessage('Detected saved answer, continuing', 0);
            this.fetch();
            this.$nextTick(function () {
                this.answer = JSON.parse(this.answer);
                fill();
                window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
            })
        }
    },
    methods: {
        fetch: function () {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            var local = sessionStorage.getItem('questions');
            if (local)
                self.questions = JSON.parse(local);
            else
                axios.get('/assignments/' + id + '/questions').then(function (res) {
                    self.questions = res.data;
                    sessionStorage.questions = JSON.stringify(res.data);
                }).cache(function (err) {
                    showMessage('Can\'t fetch the questions', 1);
                    console.log(err);
                });
        },
        submit: function () {
            if (getAnswer()) {
                var id = document.getElementsByTagName('meta')['id'].content;
                localStorage.removeItem('answer-' + id);
                var form = document.getElementById('submit_form');
                form.children[0].value = JSON.stringify(this.answer);
                form.submit();
            } else {
                showMessage('Something went wrong!', 1);
            }
        },
        save: function () {
            var self = this;
            var id = document.getElementsByTagName('meta')['id'].content;
            if (getAnswer()) {
                localStorage.setItem('answer-' + id, JSON.stringify(this.answer));
                axios.post('/assignments/' + id + '/save', {answer: self.answer}).then(function (res) {
                    showMessage(res.data.msg, res.data.status); //0=>info, 1=>danger
                }).catch(function (err) {
                    showMessage('An error occurs!', 1);
                    console.log(err);
                });
            }
            else {
                showMessage('Something went wrong!', 1);
            }
        },
    },
});

$('#get_content').on('click', function (event) {
    content.fetch();
});

function getAnswer() {
    content.answer = [];
    for (var i in content.questions) {
        var question = $('#' + i);
        var type = question.attr('type');
        switch (type) {
            case '0':
                var input = question.contents('span');
                var value = null;
                for (var j = 0; j < input.length; j++) {
                    if (input[j].children[0].checked) {
                        value = input[j].children[0].value;
                    }
                }
                content.answer[i] = value;
                break;
            case '1':
                break;
        }
    }
    return true;
}

function fill() {
    for (var i in content.answer) {
        if (!content.answer[i])
            continue;
        switch (content.questions[i].type) {
            case 0:
                $('input[name=' + i + '][value=' + content.answer[i] + ']').attr('checked', true);
                break;
        }
    }
}