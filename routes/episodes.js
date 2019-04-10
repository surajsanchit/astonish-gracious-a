var express = require('express'),
    episodes = require('../src/plumbus.episodes');

var router = express.Router();

const pageData = {
  title: 'episodes',
  filter: true
}

/* Root page for episodes */
router.get('/', async (req, res) => {
  let data = {
    page: pageData,
    current: '- select episode -',
    list: await episodes.list()
  };
  
  res.render('pages/episodes.twig', data);
});

router.get('/:id', async (req, res) => {
  let data = {
    page: pageData,
    current: '*placeholder*',
    list: await episodes.list(),
    characters: await episodes.characters(req.params.id)
  }

  res.render('pages/episodes.twig', data);
});

module.exports = router