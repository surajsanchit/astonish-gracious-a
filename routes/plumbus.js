var express = require('express');

var router = express.Router();

/* GET how to make a plumbus */
router.get('/', async (req, res) => {
  // get an integer between 1 and 3
  let chance = Math.floor((Math.random() * 3 + 1));

  console.log(chance);

  switch(chance) {
    case 1:
      res.redirect('https://www.youtube.com/watch?v=SWMGd_rzRdY');

    case 2:
      res.redirect('https://i.imgur.com/etjgJ2D.jpg');

    case 3:
      res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }
});

module.exports = router;
