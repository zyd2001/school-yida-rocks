/**
 * Created by zyd on 17-7-18.
 */
$(function () {
    if (window.innerWidth <= 768) {
        $('#nav').removeClass('container').addClass('container-fluid');
        $('.footer-lg').addClass('hidden');
        $('.footer-sm').removeClass('hidden');
    }
});

$(window).resize(function () {
    if (window.innerWidth <= 768) {
        $('#nav').removeClass('container').addClass('container-fluid');
        $('.footer-lg').addClass('hidden');
        $('.footer-sm').removeClass('hidden');
    }
    else {
        $('#nav').removeClass('container-fluid').addClass('container');
        $('.footer-lg').removeClass('hidden');
        $('.footer-sm').addClass('hidden');
    }
});