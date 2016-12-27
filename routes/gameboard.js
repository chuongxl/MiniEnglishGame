const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  let games = fs
    .readdirSync('./public/games/')
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace(/\.json$/, ''));

  res.render('gameboard', {
    title: 'Game Board',
    games: games
  });
});

module.exports = router;