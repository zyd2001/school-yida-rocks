const content = new Vue({
    el: '.assignment_content',
    data: {
        questions: null,
    },
    methods: {
        fetch: function () {
            var id = document.getElementsByTagName('meta')['id'].content;
            var self = this;
            axios.get('/assignments/' + id + '/content').then(function (res) {
                self.questions = JSON.parse(res.data);
            })
        },
        submit: function () {
            var result = new Array();
            for (var i in this.questions) {
                var question = $('#' + i);
                var type = question.attr('type');
                switch (type) {
                    case '0':
                        var input = question.contents('span');
                        var value = null;
                        for (var j = 0; j < input.length; j++) {
                            if (input[j].children[0].checked)
                            {
                                value = input[j].children[0].value
                            }
                        }
                        result[i] = value;
                        break;
                    case '1':
                        break;
                }
            }
            var form = document.getElementById('submit_form');
            form.children[0].value = JSON.stringify(result);
            form.submit();
        }
    },
});

$('#get_content').on('click', function (event) {
    content.fetch();
});