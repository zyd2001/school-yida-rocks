import Echo from "laravel-echo";
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'dd2316f11714174ab95e',
    cluster: 'ap1',
});