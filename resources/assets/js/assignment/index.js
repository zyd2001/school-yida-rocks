function assignmentStatus() {
    let setting = $('meta[name=setting]');
    let attempt = $('#attempt').html();
    let status = $('meta[name=status]');
    if (status.length === 1)
        status = status.attr('content');
    if (setting.length === 1)
        setting = JSON.parse(setting.attr('content'));
    let value = [];
    value['gradeStatus'] = status;
    value['open'] = setting.open && attempt < setting.attempt;
    if (!value['open'])
        value['msg'] = setting.open ? 'You exceed the attempt limit' : 'The assignment is closed';
    return value;
}

if (window.location.pathname.search('assignments/[0-9]+') !== -1) {
    require('./do/description');
    require('./do/content');
    require('./do/grade');
}
if (window.location.pathname.search('create+') !== -1)
    require('./create');