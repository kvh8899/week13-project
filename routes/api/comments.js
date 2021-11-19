//2 rts
const express = require('express');
const {asyncHandler} = require('../utils');
const router = express.Router();
const { CommentLike } = require("../../db/models");

//

//Like a comment
router.post('/comments/:id/likes', asyncHandler(async(req, res) => {
    const { userId, commentId } = req.body;
    
    const likedComment = await CommentLike.create({
            userId: res.locals.user.id,
            commentId: req.params.id

    })

    res.json(req.body);

    res.redirect('/comment/:id');

    
}));


//Unlike a comment
router.delete('/comments/likes/:id', asyncHandler(async(req, res) => {
        await CommentLike.destroy({
            where: {id}
        })
        res.redirect('/comments/:id');
        
}));



module.exports = router;