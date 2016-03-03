var express = require('express');
var router = express.Router();
var pg = require('pg');
var connect = require('../modules/connection');



router.post('/', function(req, res) {
  var results = [];
  var favorite = {
    type: req.body.type,
    name: req.body.name,
    image_url: req.body.image_url,
    description: req.body.description
  };

  pg.connect(connect, function(err, client, done) {
    var query = client.query('INSERT INTO animal (type, name, image_url, description) VALUES ($1, $2, $3, $4)',
      [favorite.type, favorite.name, favorite.image_url, favorite.description]
    );



    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // close connection
    query.on('end', function() {
      done();
      res.json(results);
    });

    if(err) {
      console.log(err);
    }
  });
});


router.get('/', function(req, res) {
  var results = [];

  pg.connect(connect, function(err, client, done) {
    var query = client.query('SELECT type, name, image_url, left(description, 100) description FROM animal');

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // close connection
    query.on('end', function() {
      done();
      res.json(results);
    });
//RETURN res.json(results); IF IT DOESN"T WORK^^^^(but it should)
    if(err) {
      console.log(err);
    }
  });

  console.log('results array of get request: ', results);
});


module.exports = router;