const express = require('express');
const {Follow} = require('../../db/models');
const {asyncHandler} = require('../utils.js')
const {restoreUser} = require('../../auth.js');
const createError = require("http-errors");
const router = express.Router();


router.delete('/follows/:userId(\\d+)',restoreUser,asyncHandler(async(req,res,next)=> {
    const deleteFol = await Follow.findByPk(req.params.userId);
    if(!res.locals.authenticated){
        next(createError(401));
    }else if(deleteFol){
        deleteFol.destroy();
        res.json({message:"Successfuly Unfollowed User"});
    }else{
        next(createError(404));
    }
}));

module.exports = router;