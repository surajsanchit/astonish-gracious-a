var express = require('express'),
    location = require('../src/plumbus.location');

var router = express.Router();

const pageData = {
  title: 'location',
  filter: true
};

/* GET base page */
router.get('/', async (req, res) => {
  let data = {
    page: pageData,
    list: await location.list(null)
  };

  res.render('pages/location.twig', data);
});

/* GET characters at location */
router.get('/:id/characters', async (req, res) => {
  let data = {
    page: pageData,
    list: await location.list(req.params.id),
    characters: await location.characters(req.params.id)
  };

  res.render('pages/location.twig', data);
});

module.exports = router;
