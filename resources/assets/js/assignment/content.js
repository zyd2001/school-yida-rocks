const content = new Vue({
    el: '#assignment_content',
    data: {
        questions: null,
        answer: null,
    },
    mounted: function () {
        var id = document.getElementsByTagName('meta')['id'].content;
        var status = document.getElementsByTagName('meta')['status'].content;
        if (assignmentStatus()[0]) {
            this.answer = localStorage.getItem('answer-' + id);
            if (this.answer) {
                showMessage('Detected saved answer locally, continuing', 1);
                this.fetch();
                this.$nextTick(function () {
                    this.answer = JSON.parse(this.answer);
                    fill();
                    window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
                })
            } else if (status == 2) {
                var self = this;
                showMessage('Detected saved answer on the server, continuing', 1);
                this.fetch();
                axios.get('/assignments/' + id + '/save').then(function (res) {
                    console.log(res);
                    self.$nextTick(function () {
                        self.answer = res.data;
                        fill();
                        window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
                    })
                }).catch(ajaxError(err))
            }
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
                    showMessage('Can\'t fetch the questions', 0);
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
                showMessage('Something went wrong!', 0);
            }
        },
        save: function () {
            var self = this;
            var id = document.getElementsByTagName('meta')['id'].content;
            if (getAnswer()) {
                localStorage.setItem('answer-' + id, JSON.stringify(this.answer));
                showMessage('Save successfully', 1);
                axios.post('/assignments/' + id + '/save', {answer: JSON.stringify(self.answer)}).then(function (res) {
                    showMessage(res.data.msg, res.data.status); //0=>danger, 1=>info
                }).catch(function (err) {
                    showMessage('Upload Fail', 0);
                    console.log(err);
                });
            } else {
                showMessage('Something went wrong!', 0);
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