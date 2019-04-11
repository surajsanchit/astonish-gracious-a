var express = require('express'),
    router = express.Router();

var pageData = {
  title: '',
  filter: false
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {
    page: pageData
  };

  res.render('index', data);
});

module.exports = router;
