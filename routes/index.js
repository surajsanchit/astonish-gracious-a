var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {};

  data.title = "WELCOME"

  res.render('index', data);
});

module.exports = router;
