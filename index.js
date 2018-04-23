const express = require("express");
const app = express();

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
