var express = require('express'),
    location = require('../src/plumbus.location');

var router = express.Router();

const pageData = {
  title: 'location',
  filter: true
}

/* GET base page */
router.get('/', async (req, res) => {
  let data = {
    page: pageData,
    list: await location.list()
  };

  res.render('pages/location.twig', data);
});

/* GET characters at location */
router.get('/:id/characters', async (req, res) => {
  let data = {
    page: pageData,
    list: await location.list(),
    characters: await location.characters(req.params.id)
  }
});

module.exports = router;
