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
            for (var i in this.questions) {
                var item = document.getElementsByName(i);
                for (var j in item)
                {
                    if (item[j].checked)
                        console.log(item[j].value);
                }
            }
        }
    },
});

$('#get_content').on('click', function (event) {
    content.fetch();
});