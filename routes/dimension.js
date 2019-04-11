var express = require('express'),
    dimension = require('../src/plumbus.dimension');

var router = express.Router();

const pageData = {
  title: 'dimension',
  filter: true
};

/* GET base page */
router.get('/', async (req, res) => {
  let data = {
    page: pageData,
    list: await dimension.list(null)
  };

  res.render('pages/dimension.twig', data);
});

router.get('/:id/characters', async (req, res) => {
  let data = {
    pageData,
    list: await dimension.list(req.params.id),
    characters: await dimension.characters(req.params.id)
  };

  console.log(data);

  res.render('pages/dimension.twig', data);
});

module.exports = router;
