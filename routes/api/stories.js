//2
const express = require('express');

const createError = require('http-errors');
const {asyncHandler} = require('../utils');
const { PostLike } = require("../../db/models");
const { restoreUser } = require('../../auth');
const createError = require('http-errors');



const router = express.Router();

//Like a story
router.post('/stories/:id/likes', restoreUser, asyncHandler(async(req, res, next) => {
    if (!res.locals.authenticated) {

       return next(createError(401));

    } else if (res.locals.authenticated ) {
    
     const likedPost = await PostLike.create({
        userId: res.locals.user.id,
        postId: req.params.id
    })
    }
        res.status(201).json(likedPost);

}));

//Unlike a story
router.delete('/stories/likes/:id', restoreUser, asyncHandler(async(req, res, next) => {
    const like = await PostLike.findByPk(req.params.id);
    if (!like) {res.status(404)};
    if (!res.locals.authenticated || res.locals.user.id !== like.userId) {
        return next(createError(401)); 
     } else if (res.locals.user.id === like.userId && res.locals.authenticated ) {

    await PostLike.destroy({
        where: {
            id: req.params.id
        }
    })
    }
        res.json({message: 'Deleted'});
}))


module.exports = router;