$(function() {
    $.get({
        url: '/bookings',
        cache: false,
    })
    .done(function(res) {
        debugger;
        console.log(res);
        $('#bookings').append(
            '<tr>' +
                '<th>url</th>' +
                '<th>scheduled_at</th>' +
                '<th>status</th>' +
            '</tr>');
        debugger;
    })
});