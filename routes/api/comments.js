const express = require('express');
const {Post, User,Follow,PostLike,CommentLike} = require('../../db/models');
const {getRandomInt,asyncHandler} = require('../utils.js')
const {restoreUser} = require('../../auth.js');
const createError = require("http-errors");
const limit = 6;
const { Op } = require("sequelize");
const router = express.Router();


router.post('/:commentId(\\d+)/likes',restoreUser, asyncHandler(async(req,res,next) => {
    if(!res.locals.authenticated){
        next(createError(401));
    }else{
        const commentLike = 
        await CommentLike.create({
            userId:res.locals.user.id,
            commentId:req.params.commentId
        });
        res.json(commentLike);
    }
}));

router.delete('/likes/:commentId(\\d+)',restoreUser, asyncHandler(async(req,res,next) => {
    
    if(!res.locals.authenticated){
        next(createError(401));
    }else{
        const commentDstry = await CommentLike.findOne({
            where:{
                id:req.params.commentId
            }
        });
        commentDstry.destroy();
        res.json({message:"Comment Like Successfully Deleted"});
    }
}));

module.exports = router;