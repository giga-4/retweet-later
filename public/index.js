$(function() {
    $.get({
        url: '/bookings',
        cache: false,
    })
    .done(function(res) {
        debugger;
        console.log(res);
        res.forEach(function(e) {
          var $tr = $('<tr>')
          $tr.append($('<td>').text('url'))
          $tr.append($('<td>').text('scheduled_at'))
          $tr.append($('<td>').text('status'))
          $('#bookings').append($tr);
        });
        debugger;
    })
});
