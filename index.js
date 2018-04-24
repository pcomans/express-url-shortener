const async = require("async");
const pg = require("pg");
const base32 = require("./base32");
const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Web interface goes here");
});

app.get("/:shortUrl", function(req, res) {
  let shortUrl = req.params.shortUrl.trim();

  pool.connect(function(err, client, done) {
    // Closes communication with the database and exits.
    var finish = function(longUrl) {
      res.redirect(longUrl);
      done();
    };

    if (err) {
      console.error("could not connect to cockroachdb", err);
      finish();
    }

    client.query(
      "SELECT longurl FROM urls WHERE key = $1",
      [shortUrl],
      function(err, results) {
        if (err) {
          console.error("error selecting from urls", err);
          res.send("NOT FOUND");
        }
        console.log(results);
        if (results.rowCount == 0) {
          res.send("NOT FOUND");
        } else {
          let longUrl = results.rows[0].longurl;
          finish(longUrl);
        }
      }
    );
  });
});

app.post("/s/:longUrl", function(req, res) {
  let key = base32.get8();
  console.log(`The key is: ${key}`);

  pool.connect(function(err, client, done) {
    // Closes communication with the database and exits.
    var finish = function() {
      res.send({
        longUrl: req.params.longUrl,
        shortUrl: key
      });
      done();
    };

    if (err) {
      console.error("could not connect to cockroachdb", err);
      finish();
    }

    client.query(
      "INSERT INTO urls (key, longurl) VALUES ($1, $2);",
      [key, req.params.longUrl],
      function(err, results) {
        if (err) {
          console.error("error inserting into urls", err);
          res.send({
            err: err
          });
        }
        finish();
      }
    );
  });
});

const config = {
  user: "maxroach",
  host: "localhost",
  database: "shorturl",
  port: 26257
};

// Create a pool.
const pool = new pg.Pool(config);

app.listen(3000, () => console.log("App listening on port 3000!"));
