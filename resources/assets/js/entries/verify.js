const verify = new Vue({
    el: '#verify',
    data: {
        time: 0,
        text: 'regenerate the verify code',
    },
    methods: {
        click: function (event) {
            var self = this;
            if (self.time === 0) {
                axios.post('/verify', {
                    _token: document.getElementsByTagName('meta')['csrf-token'].content,
                    re: true,
                }).then(function (res) {
                    $('#re').addClass('disabled');
                    showMessage(res.data.msg.content, res.data.msg.type);
                    self.time = 60;
                    var save = self.text;
                    var interval = setInterval(function () {
                        self.text = 'waiting for ' + self.time;
                            self.time--;
                        if (self.time === 0) {
                            clearInterval(interval);
                            $('#re').removeClass('disabled');
                            self.text = save;
                        }
                    }, 1000);
                })
            }
        }
    }
});