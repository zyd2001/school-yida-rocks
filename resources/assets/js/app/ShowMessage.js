/**
 * Created by zyd on 17-7-19.
 */
$(function () {
    var danger = $('#message_danger');
    var info = $('#message_info');
    if ($.trim(danger.contents().contents('.alert').html())) {
        danger.modal('show');
        window.setTimeout("$('#message_danger').modal('hide')", 2000);
    }
    if ($.trim(info.contents().contents('.alert').html())) {
        info.modal('show');
        window.setTimeout("$('#message_info').modal('hide')", 2000);
    }
});