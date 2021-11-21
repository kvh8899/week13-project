const express = require('express');
const {Post, User,Follow} = require('../../db/models');
const {getRandomInt,asyncHandler} = require('../utils.js')
const router = express.Router();
const {restoreUser} = require('../../auth.js');
const limit = 6;
const { Op } = require("sequelize");

router.get('/stories',asyncHandler(async (req,res,next) => { 
    const getStories = await Post.findAll({
        include: User,
        limit,
        order:[['createdAt','DESC']],
        offset:req.query.offset,
        limit
    });
    res.json(getStories);
}));


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
        offset:req.query.offset,
        order:[['createdAt','DESC']]
    })
    res.json(getFollowing);
}))
module.exports = router;