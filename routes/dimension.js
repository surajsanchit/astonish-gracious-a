var express = require('express'),
    dimension = require('../src/plumbus.dimension');

var router = express.Router();

const pageData = {
  title: 'dimension',
  filter: true
}

/* GET base page */
router.get('/', async (req, res) => {

});

module.exports = router;
