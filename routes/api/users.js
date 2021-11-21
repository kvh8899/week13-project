const express = require('express');
const router = express.Router();
const { restoreUser } = require('../../auth');
const createError = require('http-errors');
const {asyncHandler} = require('../utils');
const { Follow } = require("../../db/models");

/* Add a follower to a user */
router.post('/users/:id/followers', restoreUser, asyncHandler(async (req, res, next) => {
    
    /* Return 401 error if
           user is not authenticated. */
    if (!res.locals.authenticated) {
        return next(createError(401)); 
     }

    /* Create a new follower */
    const newFollower = await Follow.create({
        userId: res.locals.user.id,
        followerId: req.params.id
    })
  
    /* Set status 201, and
           send new follower as json response */
    res.status(201).json({newFollower});

}));

module.exports = router;