/*
 * In insecure mode:
 * cockroach sql --insecure -e 'CREATE DATABASE shorturl'
 * cockroach sql --insecure -e 'GRANT ALL ON DATABASE shorturl TO maxroach'
 */

var async = require('async');

// Require the driver.
var pg = require('pg');

// Connect to the "bank" database.
var config = {
  user: 'maxroach',
  host: 'localhost',
  database: 'shorturl',
  port: 26257
};

// Create a pool.
var pool = new pg.Pool(config);

pool.connect(function (err, client, done) {
  // Closes communication with the database and exits.
  var finish = function () {
    done();
    process.exit();
  };

  if (err) {
    console.error('could not connect to cockroachdb', err);
    finish();
  }
  async.waterfall([
    function (next) {
      // Create the "urls" table.
      client.query('CREATE TABLE IF NOT EXISTS urls (key STRING PRIMARY KEY, longUrl STRING);', next);
    },
  ],
  function (err, results) {
    if (err) {
      console.error('error inserting into and selecting from accounts', err);
      finish();
    }

    finish();
  });
});