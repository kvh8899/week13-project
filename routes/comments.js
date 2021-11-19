const express = require('express');
const router = express.Router();
const {restoreUser} = require('../auth.js');
const {asyncHandler,csrfProtection} = require('./utils.js');
const {Comment, User} = require('../db/models');
router.post('/:id(\\d+)/delete',restoreUser,asyncHandler(async (req,res) => {
    /* 
        check if logged in
            if not logged in, redirect to login page
        otherwise check if user is owner of comment
            if not owner, then deny authorization to delete
    */
   const isAuth = await Comment.findOne({
       where:{
           id:req.params.id
       },
       include: User
   })
  
    if(!res.locals.user){
        res.redirect('/login');
    }else if(res.locals.user.id !== isAuth.User.id){
        res.status = 401;
        res.send('unauthorized');
    }else{
        const dstry = await Comment.findByPk(req.params.id);
        const id = dstry.postId
        dstry.destroy();
        res.redirect('/stories/' + id );
    }

}))

module.exports = router;