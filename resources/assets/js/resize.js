/**
 * Created by zyd on 17-7-18.
 */
$(function () {
    if (window.innerWidth <= 768)
        $('nav').removeClass('container');
})

$(window).resize(function () {
    if (window.innerWidth <= 768)
        $('nav').removeClass('container');
    else
        $('nav').addClass('container');
})