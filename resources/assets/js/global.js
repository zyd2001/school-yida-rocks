let vue = [];

window.onerror = function (msg, url, line) {
    localStorage.setItem('last_error', JSON.stringify([msg, url, line]));
    msg = 'An error occurs! Error message: <br>' + msg + '<br>' + 'Please contact maintainer';
    showMessage(msg, 0, 5);
    return false;
};

axios.interceptors.response.use(null, function (err) {
    localStorage.setItem('last_error', JSON.stringify(err));
    let msg = 'An error occurs! <br> Please contact maintainer';
    showMessage(msg, 0, 5);
    return Promise.reject(err);
});

function showMessage(msg, type, time) {
    if (!time)
        time = 2;
    let modal;
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

function echo() {
    let user_id = $('meta[name=user_id]');
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

Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l= this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;   
        }           
    }       
    return true;
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function getNthIndexinString(str, searchValue, n)
{
    let index = 0;
    let cursor = 0;
    for (let i = 0; i < n; i++)
    {
        index = str.indexOf(searchValue, cursor);
        cursor = index + searchValue.length;
    }
    return index;
}

function indexOf(elem)
{
    for (let i = 0; i < this.length; i++)
    {
        if (elem === this[i])
            return i;
    }
    return -1;
}

$(echo());