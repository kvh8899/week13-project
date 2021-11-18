//2
const express = require('express');


const {asyncHandler} = require('../utils');
const { PostLike } = require("../db/models");



const router = express.Router();

//Like a story
router.post('/stories/:id/likes', asyncHandler(async(req, res) => {
    const { userId, postId } = req.body;

    const likedPost = await PostLike.create({
        userId: res.locals.user.id,
        postId: req.params.id
    })

    res.redirect('/stories/:id');


}))

//Unlike a story
router.delete('/stories/:id/likes', asyncHandler(async(req, res) => {
    await PostLike.destroy({
        where: {id}
    })
    res.redirect('/stories/:id');
}));

module.exports = router;