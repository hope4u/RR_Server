var express = require('express');
var router = express.Router();

var gEvents = require('../lib/gEvents')

/* GET home page. */

router.param('verb', function (req, res, next, verb) {
  if (/^list$/.test(verb)) {
    next();
  } else {
    res.status(404).end();
  }
});

router.get('/gEvents/:verb', function(req, res, next) {
  
  gEvents[req.params.name](function (err, events) {
    if (err) {
      return next(err);
    }    
    if (events.length > 4) {
      events.length = 4;
    }
    console.log(events);
    elements = {
      title: 'Royal Rangers 53 - Zürich Friesenberg',
      landing: true,
      events: events
    };
    
    res.render('index', elements);
  });
});

module.exports = router;