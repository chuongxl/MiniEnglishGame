const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');

router.get('/', function (req, res, next) {
  var url_parts = url.parse(req.url, true);
  var gameName = url_parts.query.game;
  var gameData = {
    MA: [],
    MB: []
  };

  if (gameName) {
    let gameDataJson = fs.readFileSync(`./public/games/${gameName}.json`);
    gameData = JSON.parse(gameDataJson);
  }

  res.render('resultboard', {
    title: 'Result Board',
    teamA: gameData.MA,
    teamB: gameData.MB,
    gameName: gameName
  });
});

module.exports = router;