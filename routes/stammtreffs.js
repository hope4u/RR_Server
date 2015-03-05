var express = require('express');
var router = express.Router();

/* GET stammtreffs page. */
router.get('/', function(req, res, next) {
  res.render('generic', { title: 'Royal Rangers 53 - Zürich Friesenberg' });
});

module.exports = router;