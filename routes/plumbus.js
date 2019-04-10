var express = require('express');
var plumbus = require('../src/plumbus.interface');

var router = express.Router();

/* GET characters by dimension. */
router.get('/characters/dimension/:dimension', async (req, res) => {
  let data = {
    title: `Characters in ${req.params.dimension}`,
    characters: await plumbus.listCharactersByDimension(req.params.dimension)
  };

  res.render('pages/charlist', data);
});

/* GET characters by location */
router.get('/characters/location/:location', async (req, res) => {
  let data = {
    title: `Characters at ${req.params.location}`,
    characters: await plumbus.listCharactersByLocation(req.params.location)
  };
  
  res.render('pages/charlist', data);
});

/* GET characters by episode */
router.get('/characters/episode/:episode', async (req, res) => {
  let data = {
    title: `Characters in episode ${req.params.episode}`,
    characters: await plumbus.listCharactersByEpisode(req.params.episode)
  };

  res.render('pages/charlist', data);
});

module.exports = router;
