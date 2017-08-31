if (window.location.pathname.search('assignments/[0-9]+') !== -1) {
    require('./description');
    require('./content');
    require('./grade');
}
if (window.location.pathname.search('create+'))
    require('./create');