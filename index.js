var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/books', function(req, res) {
  console.log(req.body);
  res.redirect('/success.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
