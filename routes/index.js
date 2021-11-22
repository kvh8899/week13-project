var express = require('express');
var router = express.Router();
var {User, Post,Follow} = require('../db/models');
const { loginUser, restoreUser } = require("../auth");
const { Op } = require("sequelize");
/* GET home page. */

router.get('/',restoreUser,async function(req, res, next) {
  const sixUsers = await Post.findAll({
    include: User,
    limit:6,
    order:[['createdAt','DESC']]
  });
  if(!res.locals.authenticated){
    res.render('index', { 
      title: 'CodeX is a place to write, read, and connect',
      post:sixUsers
    });
  }else{
    const getFollowing = await User.findOne({
      where:{
          id:res.locals.user.id
      },
      include:{
          model:User,
          as: 'Following'
      }
  })
  const following = getFollowing.Following.map(e => {
      return e.id;
  });
  let getPosts
  if(following.length){
     getPosts = await Post.findAll({
      where: {
          userId: {
              [Op.or]: following
          }
      },
      include: {
          model:User
      },
      limit:6,
      offset: req.query.offset,
      order:[['createdAt','DESC']]
  });
  }else{
    getPosts = [];
  }
    res.render('auth-index', { 
      title: 'CodeX is a place to write, read, and connect',
      post:sixUsers,
      following:getPosts
    });
  }
});

module.exports = router;

