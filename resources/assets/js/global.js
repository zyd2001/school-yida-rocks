function showMessage(msg, type) {
    var modal;
    switch (type) {
        case 0:
            modal = $('#message_danger');
            modal.contents().contents('.alert').html(msg);
            modal.modal('show');
            window.setTimeout("$('#message_danger').modal('hide');", 2000);
            break;
        case 1:
            modal = $('#message_info');
            modal.contents().contents('.alert').html(msg);
            modal.modal('show');
            window.setTimeout("$('#message_info').modal('hide');", 2000);
            break;
    }
}

function assignmentStatus() {
    var setting = $('meta[name=setting]');
    var attempt = $('#attempt').html();
    if (setting.length === 1)
        setting = JSON.parse(setting.attr('content'));
    var status = [];
    status[0] = setting.open && attempt < setting.attempt;
    if (!status[0])
        status[1] = setting.open ? 'You exceed the attempt limit' : 'The assignment is closed';
    return status;
}