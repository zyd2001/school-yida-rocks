if (window.location.pathname.search('courses/[0-9]+') !== -1)
    require('./course');
if (window.location.pathname.search('courses/create') !== -1)
    require('./create');