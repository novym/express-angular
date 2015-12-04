var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Express',
      name: 'Sam',
      someMadeUpVariable: 'get it crackin'
  });
});

module.exports = router;
