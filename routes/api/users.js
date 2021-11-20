const express = require('express');
const { restoreUser } = require('../../auth');
const createError = require('http-errors');
const {asyncHandler} = require('../utils');
const { Follow } = require("../../db/models");

const router = express.Router();

//add a follower to a user
router.post('/users/:id/followers', restoreUser, asyncHandler(async (req, res, next) => {
    if (!res.locals.authenticated) {
        return next(createError(401)); 
     }

    const newFollower = await Follow.create({
        userId: res.locals.user.id,
        followerId: req.params.id
    })
  
    res.status(201).json({message: 'Success'});

}));
//works
module.exports = router;