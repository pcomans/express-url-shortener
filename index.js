const async = require("async");
const pg = require("pg");
const base32 = require("./base32");
const express = require("express");
const app = express();

const cache = new Map();

app.get("/", function(req, res) {
  res.send("Web interface goes here");
});

app.get("/:shortUrl", function(req, res) {
  let shortUrl = req.params.shortUrl.trim();
  if (!cache.has(shortUrl)) {
    res.send("NOT FOUND");
  } else {
    res.redirect(cache.get(shortUrl));
  }
});

app.post(
  "/s/:longUrl",
  function(req, res) {
    let key = base32.get8();
    console.log(`The key is: ${key}`);
    cache.set(key, req.params.longUrl);

    res.send({
      longUrl: req.params.longUrl,
      shortUrl: key,
    });
  }
);

const config = {
  user: "maxroach",
  host: "localhost",
  database: "shorturl",
  port: 26257
};

// Create a pool.
const pool = new pg.Pool(config);

app.listen(3000, () => console.log("App listening on port 3000!"));
