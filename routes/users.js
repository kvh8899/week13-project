var express = require('express');
var router = express.Router();

const { csrfProtection } = require('./utils');

/* GET users listing. */
router.get('/login', csrfProtection, function(req, res, next) {
  res.render('login', { csrfToken: req.csrfToken() });
});

router.get('/signup', function(req, res, next) {
  res.send('respond with a signup page');
});

module.exports = router;
