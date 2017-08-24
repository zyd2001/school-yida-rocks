const setting = new Vue({
    el: '#setting',
    data: {
        password: '',
        passwordConfirm: '',
    },
    methods: {
        reset: function () {
            var self = this;
            if (this.password !== this.passwordConfirm)
                showMessage('not match', 0, 1);
            else
                axios.post('/home/resetPassword', {
                    password: this.password,
                }).then(function (res) {
                    showMessage(res.data, 1);
                })
        }
    },
});