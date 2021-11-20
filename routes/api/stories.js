const express = require('express');
const {Post, User,Follow} = require('../../db/models');
const {getRandomInt} = require('../utils.js')
const router = express.Router();
const {restoreUser} = require('../../auth.js');
const limit = 6;
const { Op } = require("sequelize");
router.get('/stories', async (req,res,next) => { 
    console.log(req.session.offset)
    try{
        // TODO write a query to get 6 random rows
        const getStories = await Post.findAll({
            include: User,
            limit,
            order:[['createdAt','DESC']],
            offset:req.session.offset
        });
        req.session.offset += 6;
        res.json(getStories)
    }catch(e){
        next(e);
    }
});
//TODO route to get people followed and their posts

router.get('/stories/following',restoreUser, async(req,res,next) => {
    try{
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
    }catch(e){
        next(e);
    }
})
module.exports = router;