/**
 * Created by zyd on 17-7-19.
 */
$(function () {
    var messageModal = $('#messageModal');
    if (messageModal.length) {
        messageModal.modal('show');
        window.setTimeout("$('#messageModal').modal('hide')", 2000);
    }
})