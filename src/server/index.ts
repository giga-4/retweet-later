import * as moment from 'moment'
import * as express from 'express'
const app = express();
import * as bodyParser from 'body-parser'
import * as mysql from 'mysql'
const connection = mysql.createConnection({
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

interface Booking {
  id: number;
  url: string;
  scheduled_at: Date;
  status: number;
}
interface BookingForClient {
  id: number;
  url: string;
  scheduled_at: string;
  status: string;
}


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

const formatBooking = function(booking: Booking): BookingForClient {
  const statusIdx = Object.values(status).indexOf(booking.status)
  const ret = {
    id: booking.id,
    url: booking.url,
    scheduled_at: moment(booking.scheduled_at).format('YYYY/MM/DD HH:mm:SS'),
    status: Object.keys(status)[statusIdx],
  }
  return ret
}

app.get('/bookings', function(req, res) {
  const query = 'SELECT * FROM bookings ORDER BY `scheduled_at` ASC LIMIT 100;';
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    res.json(results.map(formatBooking));
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
