var debug = require('debug')('Router index');
var express = require('express');
var router = express.Router();

var listEvents = require('../lib/google-listEvents').listEvents

/* GET home page. */
router.get('/', function(req, res, next) {
  
  elements = {
    title: 'Royal Rangers 53 - Zürich Friesenberg',
    landing: true,
  };

  res.render('index', elements);
  
});

module.exports = router;