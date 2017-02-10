// Require the dependencies

var express = require('express');
var bodyParser = require('body-parser');

var Bear = require('./models/bears');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

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

app.post('/api/bears', function (req, res) {
  var bear = new Bear();
  console.log("Made the Bear");
  bear.species = req.body.species;
  bear.age = req.body.age;
  bear.name = req.body.name;
  bear.weight = req.body.weight;
  bear.location = req.body.location;
  bear.attitude = req.body.attitude;
  console.log("Bear attrs set");
  bear.save(function (err, bearData) {
    console.log("Saving the Bear");
    if (err) {
      console.log("An error occured in saving the bear.");
    } else {
      res.json(bearData);
    }
  });
});

app.get('/api/bears', function (req, res) {
  Bear.find(function (err, bearData) {
    if (err) {
      console.log("You F'ed up!");
    } else {
      res.json(bearData);
    }
  });
});

app.get('/api/bears/:bear_id', function (req, res) {
  var bear_id = req.params.bear_id;
  Bear.findById(bear_id, function (err, bearData) {
    if (err) {
      console.log("The bear with id: " + bear_id + " was not found");
    } else {
      res.json(bearData);
    }
  });
});

app.put('/api/bears/:bear_id', function (req, res) {
  var bear_id = req.params.bear_id;
  Bear.findById(bear_id, function (err, bear) {
    if (err) {
      console.log("The bear with id: " + bear_id + " was not found");
    } else {
      bear.name = req.body.name ? req.body.name : bear.name;
      bear.species = req.body.species ? req.body.species : bear.species;
      bear.weight = req.body.weight ? req.body.weight : bear.weight;
      bear.location = req.body.location ? req.body.location : bear.location;
      bear.attitude = req.body.attitude ? req.body.attitude : bear.attitude;
      bear.age = req.body.age ? req.body.age : bear.age;
      bear.save(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      });
    }
  });
});

app.delete('/api/bears/:bear_id', function (req, res) {
  var bear_id = req.params.bear_id;
  Bear.remove({_id: bear_id}, function (err, bear) {
    if (err) {
      console.log(err);
    } else {
      res.json({message: "bear removed", data: bear});
    }
  });
});

app.listen(3000);

console.log('Server started on Port 3000.')
