const express = require('express');
const {Post, User} = require('../../db/models');
const {getRandomInt} = require('../utils.js')
const router = express.Router();

const limit = 6;

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

module.exports = router;