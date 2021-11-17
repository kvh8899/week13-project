var express = require('express');
var router = express.Router();
var {User, Post} = require('../db/models');
const { loginUser, restoreUser } = require("../auth");
/* GET home page. */
router.get('/', restoreUser,async function(req, res, next) {
  console.log(res.locals.authenticated);
  const sixUsers = await Post.findAll({
    include: User,
    limit:6
  });
  if(!res.locals.authenticated){
    res.render('index', { 
      title: 'CodeX is a place to write, read, and connect',
      post:sixUsers
    });
  }else{
    const currUser = await User.findOne({
      where: {
        id: req.session.auth.userId
      }
    })
    res.render('authIndex', { 
      title: 'CodeX is a place to write, read, and connect',
      post:sixUsers,
      username: currUser.username,
      email:currUser.email
    });
  }

  
});

module.exports = router;
