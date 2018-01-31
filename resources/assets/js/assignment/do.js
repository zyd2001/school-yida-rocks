const content = new Vue({
    el: '#assignment_content',
    data: {
        questions: null,
        answer: null,
        matching: new Array(5),
    },
    mounted: function () {

        //Storage function:
        var id = document.getElementsByTagName('meta')['id'].content;
        var aStatus = assignmentStatus();
        if (aStatus['open']) {
            this.answer = localStorage.getItem('answer-' + id);
            if (this.answer) {
                showMessage('Detected saved answer locally, continuing', 1);
                this.fetch();
                this.$nextTick(function () {
                    this.answer = JSON.parse(this.answer);
                    fill();
                    window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
                })
            } else if (aStatus['gradeStatus'] == 2) {
                var self = this;
                showMessage('Detected saved answer on the server, continuing', 1);
                this.fetch();
                axios.get('/assignments/' + id + '/save').then(function (res) {
                    localStorage.setItem('answer-' + id, JSON.stringify(res.data));
                    self.$nextTick(function () {
                        self.answer = res.data;
                        fill();
                        window.setTimeout('$("#assignment_content").slideDown();$("#assignment_description").slideUp()', 500);
                    })
                })
            }
        }
    },
    methods: {
        fetch: function () {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            var local = sessionStorage.getItem('questions-' + id);
            if (local)
                self.questions = JSON.parse(local);
            else
                axios.get('/assignments/' + id + '/questions').then(function (res) {
                    self.questions = res.data;
                    sessionStorage.setItem('questions-' + id, JSON.stringify(res.data));
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
        save: function (type) {
            var self = this;
            var id = document.getElementsByTagName('meta')['id'].content;
            if (getAnswer()) {
                switch (type) {
                    case 0:
                        localStorage.setItem('answer-' + id, JSON.stringify(this.answer));
                        showMessage('Save successfully', 1);
                        break;
                    case 1:
                        axios.post('/assignments/' + id + '/save', {answer: JSON.stringify(self.answer)}).then(function (res) {
                            showMessage(res.data.msg.content, res.data.msg.type); //0=>danger, 1=>info
                        });
                        break;
                }
            } else {
                showMessage('Something went wrong!', 0);
            }
        },
        blank: function (event) {
            if (event.target.textContent.length === 0) {
                event.target.textContent = "\u00a0\u00a0";
            }
        },
        match: function (event) {
            var current = $(event.target);
            var index = current.attr('index');
            var c = $('#canvas-' + index);
            if (!c.width()) {
                var w = c.parent().width();
                var h = c.parent().height();
                c[0].width = w;
                c[0].height = h;
            }
            var ctx = c[0].getContext('2d');
            var choices = $('a[index=' + index + '].disabled');
            current.addClass('disabled').siblings().addClass('disabled');
            choices.on('click', function (e) {
                var choice = $(e.target);
                var input = $('#' + index).contents('input[name=result]');
                var result = input.val();
                if (!result)
                    result = [];
                else
                    result = JSON.parse(result);
                result[current.attr('order')] = choice.attr('value');
                ctx.clearRect(0, 0, c.width(), c.height());
                ctx.strokeStyle = '#007bff';
                for (var i in result) {
                    if (result[i])
                        draw(ctx, $('[index=' + index + '][order=' + i + ']'), $('[index=' + index + '][value=' + result[i] + ']'), c);
                }
                choices.unbind('click');
                choices.addClass('disabled');
                current.removeClass('disabled').siblings().removeClass('disabled');
                result = JSON.stringify(result);
                input.val(result);
            });
            choices.removeClass('disabled');
        }
    },
});

function getAnswer() {
    content.answer = [];
    var result;
    for (var i in content.questions) {
        var type = content.questions[i].type;
        switch (type) {
            case 'multiple_choice':
                var input = $('input[name=' + i + ']');
                let value = [];
                for (var j = 0; j < input.length; j++) {
                    if (input[j].checked) {
                        value.push(input[j].value);
                    }
                }
                content.answer[i] = value;
                break;
            case 'fill_in_the_blank':
                let fitb = $('#' + i);
                content.answer[i] = [];
                fitb.find('.blank-text').each(function () {
                    content.answer[i].push(this.textContent.trim());
                })
                break;
            case 'matching':
                result = $('#' + i).contents('input[name=result]').val();
                content.answer[i] = result;
                break;
            case 'short_answer':
                result = $('#' + i).contents('textarea').val();
                content.answer[i] = result;
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

function draw(ctx, current, choice, c) {
    var prev = current.prevAll();
    var x1 = 0, x2 = c.width(), y1 = 0, y2 = 0;
    for (var i = 0; i < prev.length; i++)
        y1 += ($(prev[i]).height() + 7);
    y1 += current.height() / 2.0 + 7;
    prev = choice.prevAll();
    for (var i = 0; i < prev.length; i++)
        y2 += ($(prev[i]).height() + 7);
    y2 += choice.height() / 2.0 + 7;
    drawLine(ctx, x1, y1, x2, y2);
}

const description = new Vue({
    el: '#assignment_description',
    data: {
        isOpen: true,
        buttonText: 'Complete This Assignment',
    },
    methods: {},
    mounted: function () {
        var aStatus = assignmentStatus();
        this.isOpen = aStatus['open'];
        this.buttonText = aStatus['msg'] ? aStatus['msg'] : 'Complete This Assignment';
    }
});

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
                self.answer = JSON.parse(res.data.grade.answer);
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

function assignmentStatus() {
    let setting = $('meta[name=setting]');
    let attempt = $('#attempt').html();
    let status = $('meta[name=status]');
    if (status.length === 1)
        status = status.attr('content');
    if (setting.length === 1)
        setting = JSON.parse(setting.attr('content'));
    let value = [];
    value['gradeStatus'] = status;
    value['open'] = setting.open && attempt < setting.attempt;
    if (!value['open'])
        value['msg'] = setting.open ? 'You exceed the attempt limit' : 'The assignment is closed';
    return value;
}

$('#get_detail').on('click', function (event) {
    grade.fetch();
});

$('#get_content').on('click', function (event) {
    content.fetch();
});