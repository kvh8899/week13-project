const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { sequelize, Follow } = require("../../db/models");
const {asyncHandler} = require('../utils');





router.delete('/follows/:id', asyncHandler(async (req, res) => {
    const follow = await Follow.findPk(req.params.id);
    if (typeof follow === "undefined" ) {res.status(404)};

    if (!res.locals.authenticated || res.locals.user.id !== follow.followerId) {
        return next(createError(401)); 
     } else if (res.locals.user.id === follow.followId && res.locals.authenticated) {
    
        await Follow.destroy({where:{id: req.params.id}})
        
     }

    res.json({message: "Follower deleted"});

}))

module.exports = router;