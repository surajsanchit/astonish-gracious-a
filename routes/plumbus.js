var express = require('express');
var router = express.Router();

var plumbus = require('../src/plumbus.interface');

/* GET characters in a given dimension. */
router.get('/characters-in-dimension/:dimension', async (req, res) => {
  let data = {};
  
  data.title = `Characters in ${req.params.dimension}`;
  
  data.characters = await plumbus.listCharactersInDimension(req.params.dimension);

  res.render('pages/charlist', data);
});

module.exports = router;