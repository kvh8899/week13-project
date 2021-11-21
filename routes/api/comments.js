//2 rts
const express = require('express');
const {asyncHandler} = require('../utils');
const { restoreUser } = require('../../auth');
const createError = require('http-errors');
const router = express.Router();
const { sequelize, CommentLike } = require("../../db/models");

/* Like a comment */
router.post('/comments/:id/likes', restoreUser, asyncHandler(async(req, res) => {

    if (!res.locals.authenticated || res.locals.user.id !== like.userId) {
        /* Return error 401, if
               user is not authenticated, or
               user is not liker */
        return next(createError(401)); 

    } else if (res.locals.authenticated ) {
        
        /* Create comment like */
        const likedComment = await CommentLike.create({
                userId: res.locals.user.id,
                commentId: req.params.id
            })
        }

        /* Set status 201, and
           respond with json, likedComment */
        res.status(201).json(likedComment);
    }));


/* Unlike a comment */
router.delete('/comments/likes/:id', restoreUser, asyncHandler(async(req, res) => {

        /* Initialize like object */
        const like = await CommentLike.findByPk(req.params.id);

        /* Return error 404, if 
           there is no like object */
        if (!like) {
            return next(createError(404)); 
        };
    
        if (!res.locals.authenticated || res.locals.user.id !== like.userId) {

            /* Return error 401 if
                   user is not authenticated, or
                   current user is not the liker */
            return next(createError(401)); 

        } else if (res.locals.user.id === like.userId && res.locals.authenticated ) {
                /* Destroy like if
                    user is authenticated, and
                    current user is the liker. */
                like.destroy({where: {id:req.params.id}})
        }
        /* Respond with json message,
           "Comment like deleted" */  
        res.json({message: "Comment like deleted"});
    }));

module.exports = router;