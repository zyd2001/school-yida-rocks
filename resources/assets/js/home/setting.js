const setting = new Vue({
    el: '#setting',
    data: {
        password: '',
        passwordConfirm: '',
        match: null,
    },
    methods: {
        reset: function () {
            var self = this;
            if (this.password !== this.passwordConfirm)
                this.match = false;
            else
                axios.post('/home/setting/resetPassword', {
                    password: this.password,
                }).then(function (res) {
                    showMessage(res.data.msg.content, res.data.msg.type);
                })
        }
    },
});