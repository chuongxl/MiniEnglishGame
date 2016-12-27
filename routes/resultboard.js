const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) { 
  res.render('resultboard', {
    title: 'Result Board'
  });
});

module.exports = router;