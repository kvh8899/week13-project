//2
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {asyncHandler} = require('../utils');
const { PostLike } = require("../../db/models");
const { restoreUser } = require('../../auth');

/* Like a story */
router.post('/stories/:id/likes', restoreUser, asyncHandler(async(req, res, next) => {

        if (!res.locals.authenticated) {

           /* If the user is not authenticated,
              return a 401 error */ 
           return next(createError(401));

        } else if (res.locals.authenticated ) {
            
            /* If the user is authenticated,
               create a new like */
            const likedPost = await PostLike.create({
                userId: res.locals.user.id,
                postId: req.params.id
            })
        }

        /* User has been authenticated, and
           a like has been created.
           Set 201 status code for response, and
           send likedPost as json response. */
        res.status(201).json(likedPost);

    }));

/* Unlike a story */
router.delete('/stories/likes/:id', restoreUser, asyncHandler(async(req, res, next) => {
        
        /* Initialize like object */
        const like = await PostLike.findByPk(req.params.id);

        /* Set status 404; 
           there is no like object */
        if (!like) {res.status(404)};

        if (!res.locals.authenticated || res.locals.user.id !== like.userId) {

            /* Return error 401 if
                   user is not authenticated, or
                   current user is not the liker */
            return next(createError(401)); 
         } else if (res.locals.user.id === like.userId && res.locals.authenticated ) {

                /* Destroy like if
                    user is authenticated, and
                    current user is the liker. */
                like.destroy({
                    where: {
                        id: req.params.id
                    }
                })
        }
        /* Respond with json message,
           "Story like deleted" */
        res.json({message: 'Story like deleted'});
    }))


module.exports = router;