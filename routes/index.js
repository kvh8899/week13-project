var express = require('express');
var router = express.Router();
var {User, Post} = require('../db/models');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const sixUsers = await Post.findAll({
    include: User,
    limit:6
  });

  res.render('index', { title: 'CodeX is a place to write, read, and connect',post:sixUsers});
});

module.exports = router;
