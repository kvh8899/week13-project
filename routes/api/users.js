const express = require('express');
const router = express.Router();
const { restoreUser } = require('../../auth');
const createError = require('http-errors');
const {asyncHandler} = require('../utils');
const { Follow } = require("../../db/models");

/* Add a follower to a user */
router.post('/users/:id/followers', restoreUser, asyncHandler(async (req, res, next) => {
<<<<<<< HEAD
    
    if (!res.locals.authenticated) {
        return next(createError(401)); 
     }

    const newFollower = await Follow.create({
        userId: res.locals.user.id,
        followerId: req.params.id
    })
  
    res.status(201).json({newFollower});
=======

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
           send message, 'Success' as json response */
        res.status(201).json({message: 'Success'});
>>>>>>> 0420a10e3f7f6a7a747807cb93a5381b096f8765

    }));

module.exports = router;