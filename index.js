const async = require("async");
const pg = require("pg");
const base32 = require("./base32");
const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Web interface goes here");
});

app.get("/:shortUrl", function(req, res) {
  console.log(`Should return long URL for ${req.params.shortUrl}`);
  res.send(req.params);
});

app.post(
  "/s/:longUrl",
  function(req, res, next) {
    console.log(`Should shorten long URL ${req.params.longUrl}`);
    
    let key= base32.get8();
    console.log(`The key is: ${key}`);

    next();
  },
  function(req, res) {
    console.log("Should return shortened URL");
    res.send(req.params);
  }
);

app.listen(3000, () => console.log("App listening on port 3000!"));
