const express = require('express');

const { restoreUser } = require('../auth');

const router = express.Router();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

router.get('/', restoreUser, (req, res) => {
  const authors = [
    {
      name: "Justin Russo",
      socials: [
        {
          iconName: "github",
          url: "https://github.com/justinrusso",
        }
      ]
    },
    {
      name: "Ken Julian",
      socials: [
        {
          iconName: "github",
          url: "https://github.com/kenjulian",
        }
      ]
    },
    {
      name: "Kyle Huang",
      socials: [
        {
          iconName: "github",
          url: "https://github.com/kvh8899",
        }
      ]
    },
    {
      name: "Ricky Tang",
      socials: [
        {
          iconName: "github",
          url: "https://github.com/rickythewriter",
        }
      ]
    }
  ];

  shuffleArray(authors);

  res.render('about', {
    authors,
  });
});

module.exports = router;
