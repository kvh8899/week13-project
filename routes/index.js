var express = require('express');
var router = express.Router();
var {User, Post,Follow} = require('../db/models');
const { loginUser, restoreUser } = require("../auth");
const { Op } = require("sequelize");
/* GET home page. */
router.get('/', restoreUser,async function(req, res, next) {
  req.session.offset = 6;
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
    const getFollowing = await Post.findAll({
      include:{
          model: User,
          include:{
              model:User,
              as:"Followers",
              where:{
                  id:res.locals.user.id
              }
          }
      },
      order:[['createdAt','DESC']],
      limit:6,
  })
    res.render('auth-index', { 
      title: 'CodeX is a place to write, read, and connect',
      post:sixUsers,
      following:getFollowing
    });
  }

  
});

router.get('/reset',(req,res) => {
  req.session.offset = 0;
  res.send('Reset');
})
module.exports = router;

