const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { restoreUser } = require('../../auth');
const { sequelize, Follow } = require("../../db/models");
const {asyncHandler} = require('../utils');

/* Delete a follower from a user */
router.delete('/follows/:id', restoreUser, asyncHandler(async (req, res, next) => {

        /* Initialize follow object */
        const follow = await Follow.findByPk(req.params.id);

        /* Return error 404, if 
           there is no follow object */
        if (!follow) {
            return next(createError(404)); 
        };

        if (!res.locals.authenticated || res.locals.user.id !== follow.followerId) {
            /* Return error 401 if
                   user is not authenticated, or
                   user is not the follower */
            res.status(401);

         } else if (res.locals.user.id === follow.followerId && res.locals.authenticated) {
        
            /* Destroy follow if
                   user is authenticated, and
                   user is follower */
            await follow.destroy()
            
         }

        /* Respond with json message,
            "Follower deleted" */
        res.json({message: "Follower deleted"});

    }));

module.exports = router;