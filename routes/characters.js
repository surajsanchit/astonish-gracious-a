var express = require('express');
var plumbus = require('../src/plumbus.interface');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/characters', {});
});

/* GET characters by dimension. */
router.get('/dimension/:dimension', async (req, res) => {
  let data = {
    page: 'dimension',
    filter_page: true,
    title: req.params.dimension,
    characters: await plumbus.listCharactersByDimension(req.params.dimension)
  };

  res.render('pages/charlist', data);
});

/* GET characters by location */
router.get('/location/:location', async (req, res) => {
  let data = {
    page: 'location',
    filter_page: true,
    title: req.params.location,
    characters: await plumbus.listCharactersByLocation(req.params.location)
  };
  
  res.render('pages/charlist', data);
});

/* GET characters by episode */
router.get('/episode/:episode', async (req, res) => {
  let data = {
    page: 'episode',
    filter_page: true,
    title: req.params.episode,
    characters: await plumbus.listCharactersByEpisode(req.params.episode)
  };

  res.render('pages/charlist', data);
});

module.exports = router;
