const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { sequelize, Follow } = require("../../db/models");
const {asyncHandler} = require('../utils');

/* Delete a follower from a user */
router.delete('/follows/:id', asyncHandler(async (req, res) => {

        /* Initialize follow object */
        const follow = await Follow.findPk(req.params.id);

        /* Return error 404, if 
           there is no follow object */
        if (typeof follow === "undefined" ) {
            res.status(404); 
        };

        if (!res.locals.authenticated || res.locals.user.id !== follow.followerId) {
            /* Return error 401 if
                   user is not authenticated, or
                   user is not the follower */
            return next(createError(401));

         } else if (res.locals.user.id === follow.followId && res.locals.authenticated) {
        
            /* Destroy follow if
                   user is authenticated, and
                   user is follower */
            follow.destroy({where:{id: req.params.id}})
            
         }

        /* Respond with json message,
            "Follower deleted" */
        res.json({message: "Follower deleted"});

    }));

module.exports = router;