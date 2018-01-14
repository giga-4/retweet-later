var moment = require('moment');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  password : 'password',
  database : 'retweet_later'
});
connection.connect();
const status = {
  'FAILED'  : -1,
  'WAITING' : 0,
  'COMPLETE': 1,
};
Object.freeze(status);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/bookings', function(req, res) {
  const query = 'INSERT INTO bookings SET ?';
  const options = {
    url: req.body.url,
    scheduled_at: req.body.scheduled_at,
    status: status.WAITING,
  }
  connection.query(query, options, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/success.html');
  });
});

const formatBooking = function(booking) {
  const ret = {}
  ret.id = booking.id
  ret.url = booking.url
  ret.scheduled_at = moment(booking.scheduled_at).format('YYYY/MM/DD HH:mm:SS')
  const statusIdx = Object.values(status).indexOf(booking.status)
  ret.status = Object.keys(status)[statusIdx]
  return ret
}

app.get('/bookings', function(req, res) {
  const query = 'SELECT * from bookings LIMIT 100;';
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    res.json(results.map(formatBooking));
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
