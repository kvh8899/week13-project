const express = require('express');
const {Post, User} = require('../../db/models');
const {getRandomInt} = require('../utils.js')
const router = express.Router();

const limit = 6;

router.get('/stories', async (req,res,next) => { 
    
    try{
        // TODO write a query to get 6 random rows
        const getStories = await Post.findAll({
            include: User,
            limit,
            offset:getRandomInt(10)
        })
        getStories.forEach(story => {
            story.createdAt = story.createdAt.toLocaleDateString("en-US",
            { month: "short", day: "numeric" });
        })
        res.json(getStories)
    }catch(e){
        next(e);
    }
})

module.exports = router;