var express = require('express');
var router = express.Router();
var {User, Post,Follow} = require('../db/models');
const { loginUser, restoreUser } = require("../auth");
/* GET home page. */
router.get('/', restoreUser,async function(req, res, next) {
  /*
  TODO: get list of posts that the users follow

  To get users with an array of followers
  const getUsers = await User.findAll({
    include: {
      model: User,
      as:"Followers"
    }
  });
  to get users with an array of following
  const getUsers = await User.findAll({
    include: {
      model: User,
      as:"Following"
    }
  });
  */
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
    res.render('authIndex', { 
      title: 'CodeX is a place to write, read, and connect',
      post:sixUsers,
      following:[]
    });
  }

  
});

module.exports = router;
