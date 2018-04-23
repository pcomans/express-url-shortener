const async = require("async");
const pg = require("pg");
const express = require("express");
const app = express();

// Crockford's Base32
const base32Chars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "j",
  "k",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z"
];

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
    let key = "";
    for (let i = 0; i < 7; i++) {
      let idx = Math.floor(Math.random() * 32.0);
      key += base32Chars[idx];
    }
    console.log(`The key is: ${key}`);

    next();
  },
  function(req, res) {
    console.log("Should return shortened URL");
    res.send(req.params);
  }
);

app.listen(3000, () => console.log("App listening on port 3000!"));
