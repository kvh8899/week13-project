const express = require('express');
const {Post, User,Follow,PostLike} = require('../../db/models');
const {getRandomInt,asyncHandler} = require('../utils.js')
const router = express.Router();
const {restoreUser} = require('../../auth.js');
const createError = require("http-errors");
const limit = 6;
const { Op } = require("sequelize");
router.get('/', asyncHandler(async (req,res,next) => { 
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

router.get('/following',restoreUser, asyncHandler(async(req,res,next) => {
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
    })
    let getPosts = getFollowing.filter(e => {
        if(e.User) return true;
    })
    res.json(getPosts);
}))


//like a post
router.post('/:storyId(\\d+)/likes',
restoreUser,
asyncHandler(async(req,res,next) => {
    //if not logged in, redirect to login
    if(!res.locals.authenticated){
        next(createError(401));
    }else{
        const postLike = await PostLike.create({
            userId: res.locals.user.id,
            postId: req.params.storyId
        });
        res.status(201).json(postLike);
    }
}));

router.delete('/likes/:likesId(\\d+)',
restoreUser,
asyncHandler(async(req,res,next) => {
    const like = await PostLike.findByPk(req.params.likesId);
    if(!res.locals.authenticated){
        next(createError(401));
    }else if(like){
        like.destroy();
        res.json({message: 'Comment Successfully Deleted'})
    }else{
        next(createError(404));
    }
}));
module.exports = router;