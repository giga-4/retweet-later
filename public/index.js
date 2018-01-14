$(function() {
    var $bookings = $('#bookings')
    $.get({
        url: '/bookings',
        cache: false,
    })
    .done(function(res) {
        debugger;
        console.log(res);
        res.forEach(function(e) {
          var $tr = $('<tr>')
          $tr.append($('<td>').text(e.url))
          $tr.append($('<td>').text(e.scheduled_at))
          $tr.append($('<td>').text(e.status))
          $bookings.append($tr);
        });
        debugger;
    })
});
