$(function() {
    $.get({
        url: '/bookings',
        cache: false,
    })
    .done(function(res) {
        console.log(res);
        debugger;
    })
});