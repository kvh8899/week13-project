//2 rts
const express = require('express');
const {asyncHandler} = require('../utils');
const { restoreUser } = require('../../auth');
const createError = require('http-errors');
const router = express.Router();
const { CommentLike } = require("../../db/models");

//

//Like a comment
router.post('/comments/:id/likes', restoreUser, asyncHandler(async(req, res) => {

   

    if (!res.locals.authenticated || res.locals.user.id !== like.userId) {
        return next(createError(401)); 
    } else if (res.locals.authenticated ) {
    
    const likedComment = await CommentLike.create({
            userId: res.locals.user.id,
            commentId: req.params.id

    })

    }

    res.status(201).json(likedComment);

   

    
}));


//Unlike a comment
router.delete('/comments/likes/:id', asyncHandler(async(req, res) => {
    if (!res.locals.authenticated || res.locals.user.id !== like.userId) {
        return next(createError(401)); 

    } else if (res.locals.user.id === like.userId && res.locals.authenticated ) {
    
    

        await CommentLike.destroy({
            where: {
                id:req.params.id
            }
        })
    }
        res.json({message: "Comment deleted"});
        
}));



module.exports = router;