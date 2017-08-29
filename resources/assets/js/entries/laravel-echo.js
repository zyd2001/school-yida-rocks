import Echo from "laravel-echo";

// var window.Echo = new Echo({
//         broadcaster: 'pusher',
//         key: 'dd2316f11714174ab95e',
//         cluster: 'ap1',
//     });
// }user_id = $('meta[name=user_id]');
// if (user_id.length === 1) {
//
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
})