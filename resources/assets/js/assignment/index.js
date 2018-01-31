if (window.location.pathname.search('assignments/[0-9]+') !== -1) {
    // require('./do/description');
    require('./do');
    // require('./do/grade');
}
if (window.location.pathname.search('create+') !== -1)
    require('./create');