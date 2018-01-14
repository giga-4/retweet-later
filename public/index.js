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
                '<td>url</td>' +
                '<td>scheduled_at</td>' +
                '<td>status</td>' +
            '</tr>');
        debugger;
    })
});