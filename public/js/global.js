function showMessage(msg, type) {
    var modal;
    switch (type) {
        case 0:
            modal = $('#message_info');
            modal.contents().contents('.alert').html(msg);
            modal.modal('show');
            window.setTimeout("$('#message_info').modal('hide');", 2000);
            break;
        case 1:
            modal = $('#message_danger');
            modal.contents().contents('.alert').html(msg);
            modal.modal('show');
            window.setTimeout("$('#message_danger').modal('hide');", 2000);
            break;
    }
}