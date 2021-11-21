const express = require('express');
const {Post, User,Follow} = require('../../db/models');
const {getRandomInt,asyncHandler} = require('../utils.js')
const router = express.Router();
const {restoreUser} = require('../../auth.js');
const limit = 6;
const { Op } = require("sequelize");
router.get('/stories', asyncHandler(async (req,res,next) => { 
    // TODO write a query to get 6 random rows
    const getStories = await Post.findAll({
        include: User,
        limit,
        order:[['createdAt','DESC']],
        offset:req.session.offset
    });
    req.session.offset += 6;
    res.json(getStories);
}));
//TODO route to get people followed and their posts

router.get('/stories/following',restoreUser, asyncHandler(async(req,res,next) => {
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
        limit,
        offset:req.session.offset,
        order:[['createdAt','DESC']]
    })
    req.session.offset += 6;
    res.json(getFollowing);
}))
module.exports = router;