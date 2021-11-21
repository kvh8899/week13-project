const express = require('express');
const {CommentLike} = require('../../db/models');
const {asyncHandler} = require('../utils.js')
const {restoreUser} = require('../../auth.js');
const createError = require("http-errors");
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
        res.status(201).json(commentLike);
    }
}));

router.delete('/likes/:commentId(\\d+)',restoreUser, asyncHandler(async(req,res,next) => {
    const commentDstry = await CommentLike.findOne({
        where:{
            id:req.params.commentId
        }
    });
    if(!res.locals.authenticated){
        next(createError(401));
    }else if(commentDstry){
        commentDstry.destroy();
        res.json({message:"Comment Like Successfully Deleted"});
    }
}));

module.exports = router;