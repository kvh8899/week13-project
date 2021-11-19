const express = require('express');
const { restoreUser } = require('../../auth');
const {asyncHandler} = require('../utils');
const { Follow } = require("../../db/models");

const router = express.Router();

//add a follower to a user
router.post('/users/:id/followers', restoreUser, asyncHandler(async (req, res, next) => {
    if (!res.locals.authenticated) {
        return next(Error('Not authenticated'))
    }

    const newFollower = await Follow.create({
        userId: res.locals.user.id,
        followerId: req.params.id
    })
  
    res.json({message: 'Success'});

}));
//works
module.exports = router;