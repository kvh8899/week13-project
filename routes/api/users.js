const express = require('express');
const {Follow} = require('../../db/models');
const {asyncHandler} = require('../utils.js')
const router = express.Router();
const {restoreUser} = require('../../auth.js');
const createError = require("http-errors");
const { Op } = require("sequelize");

router.post('/:userId(\\d+)/followers',
restoreUser,
asyncHandler(async(req,res,next) => {
    if(!res.locals.authenticated){
        next(createError(401));
    }else{
        const createFollow = await Follow.create({
            userId:req.params.userId,
            followerId:res.locals.user.id
        });
        res.status(201).json(createFollow);
    }
}));




module.exports = router;