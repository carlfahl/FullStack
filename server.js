// Require the dependencies

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Let us read Post Data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Hello World!!!  I am Sharknato!!!");
});

app.get('/api/greeting', function (req, res) {
  res.send('Hello.  Welcome to the greeting API');
});

app.post('/api/greeting', function (req, res) {
  var name = req.body.name;
  var greeting = req.body.greeting;
  res.json({name: name, greeting: greeting});
});

app.get('/api/greeting/:name', function (req, res) {
  res.send("Hello, "+ req.params.name);
});

app.listen(3000);

console.log('Server started on Port 3000.')
