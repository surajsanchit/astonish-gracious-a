var express = require('express'),
    episode = require('../src/plumbus.episode');

var router = express.Router();

const pageData = {
  title: 'episode',
  filter: true
}

/* GET base page */
router.get('/', async (req, res) => {
  let data = {
    page: pageData,
    current: '- select episode -', //TODO: place this in list.
    list: await episode.list()
  };
  
  res.render('pages/episode.twig', data);
});

/* GET characters on episode */
router.get('/:id/characters', async (req, res) => {
  let data = {
    page: pageData,
    current: '*placeholder*',
    list: await episode.list(),
    characters: await episode.characters(req.params.id)
  }

  res.render('pages/episode.twig', data);
});

module.exports = router