const async = require("async");
const pg = require("pg");
const express = require("express");
const app = express();

app.get('/', function (req, res) {
  res.send('Web interface goes here');
});

app.get('/:shortUrl', function (req, res) {
  console.log("Should return long URL");
  res.send(req.params);
});

app.post('/s/:longUrl', function (req, res, next) {
  console.log("Should shorten long URL");
  next();
}, function(req, res) {
  console.log("Should return shortened URL");
  res.send(req.params);
});

app.listen(3000, () => console.log("App listening on port 3000!"));
