var vue = [];

window.onerror = function (msg, url, line) {
    localStorage.setItem('last_error', JSON.stringify([msg, url, line]));
    msg = 'An error occurs! Error message: <br>' + msg + '<br>' + 'Please contact maintainer';
    showMessage(msg, 0, 5);
    return false;
};

axios.interceptors.response.use(null, function (err) {
    localStorage.setItem('last_error', JSON.stringify(err));
    var msg = 'An error occurs! <br> Please contact maintainer';
    showMessage(msg, 0, 5);
    return Promise.reject(err);
});

function showMessage(msg, type, time) {
    if (!time)
        time = 2;
    var modal;
    switch (type) {
        case 0:
            modal = $('#message_danger');
            modal.contents().contents('.alert').html(msg);
            modal.modal('show');
            window.setTimeout("$('#message_danger').modal('hide');", time * 1000);
            break;
        case 1:
            modal = $('#message_info');
            modal.contents().contents('.alert').html(msg);
            modal.modal('show');
            window.setTimeout("$('#message_info').modal('hide');", time * 1000);
            break;
    }
}

function assignmentStatus() {
    var setting = $('meta[name=setting]');
    var attempt = $('#attempt').html();
    var status = $('meta[name=status]');
    if (status.length === 1)
        status = status.attr('content');
    if (setting.length === 1)
        setting = JSON.parse(setting.attr('content'));
    var value = [];
    value['gradeStatus'] = status;
    value['open'] = setting.open && attempt < setting.attempt;
    if (!value['open'])
        value['msg'] = setting.open ? 'You exceed the attempt limit' : 'The assignment is closed';
    return value;
}

function echo() {
    var user_id = $('meta[name=user_id]');
    if (user_id.length === 1) {
        user_id = user_id.attr('content');
        Echo.channel('user-' + user_id)
            .listen('CoursesChange', function () {
                vue['header'].getCourses(true)
            })
            .listen('MessageChange', function () {
                vue['header'].getMessageAmount(true);
            })
            .listen('.Message', function (event) {
                showMessage(event.msg.content, event.msg.type, 5);
            })
            .listen('.GlobalMessage', function (event) {
                showMessage('A Global Message:<br>' + event.msg.content, event.msg.type, 5);
            });
    }
}

$(echo());