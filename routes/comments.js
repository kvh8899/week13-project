const express = require('express');
const router = express.Router();
const {restoreUser} = require('../auth.js');
const {asyncHandler,csrfProtection} = require('./utils.js');
const {Comment, User,CommentLike} = require('../db/models');
router.delete('/:id(\\d+)/delete',restoreUser,asyncHandler(async (req,res) => {
    /* 
        check if logged in
            if not logged in, redirect to login page
        otherwise check if user is owner of comment
            if not owner, then deny authorization to delete
    */
   const dstry = await Comment.findOne({
       where:{
           id:req.params.id
       },
       include: [User,CommentLike]
   })
    if(!res.locals.user){
        res.redirect('/login');
    }else if(res.locals.user.id !== dstry.User.id){
        res.status = 401;
    }else{
        dstry.CommentLikes.forEach(e => {
            e.destroy();
        })
        dstry.destroy();
    }
    res.json({message:'deleted'});
}))

module.exports = router;