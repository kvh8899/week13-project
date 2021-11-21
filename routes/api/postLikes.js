const express = require('express');
const {Post, User,Follow,PostLike} = require('../../db/models');
const {getRandomInt,asyncHandler} = require('../utils.js')
const {restoreUser} = require('../../auth.js');
const { Op } = require("sequelize");
const createError = require('http-errors');

const router = express.Router();

//get all likes for a post


//unlike a post

router.delete('/:likesId(\\d+)/',
restoreUser,
asyncHandler(async(req,res,next) => {

    if(!res.locals.authenticated){
        res.status = 401;
        res.redirect('/login')
    }else{
        const likeDelete = 
        await PostLike.findByPk(req.params.likesId);
        likeDelete.destroy();
        res.json({message: 'Comment Successfully Deleted'})
    }
}));

module.exports = router;