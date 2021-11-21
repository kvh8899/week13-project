var express = require('express');
var router = express.Router();
var {User, Post,Follow} = require('../db/models');
const { loginUser, restoreUser } = require("../auth");
/* GET home page. */
router.get('/', restoreUser,async function(req, res, next) {
  
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
    const getUsers = await User.findAll({
        where:{
          id:res.locals.user.id
        },
        include:{
          model: User,
          as: 'Following',
          include:Post
        }
        
    });
    let followingArr = [];
    getUsers[0].Following.forEach(e => {
      e.Posts.forEach(ex => {
        ex.User = e;
      })
      followingArr = followingArr.concat(e.Posts);
    });
    res.render('auth-index', { 
      title: 'CodeX is a place to write, read, and connect',
      post:sixUsers,
      following:followingArr
    });
  }

  
});

module.exports = router;
