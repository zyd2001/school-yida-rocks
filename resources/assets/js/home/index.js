if (window.location.pathname === '/home')
    require('./GetAssignments');
if (window.location.pathname.search('setting+') !== -1)
    require('./setting');