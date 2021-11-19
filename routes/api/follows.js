const express = require('express');
const router = express.Router();
const { Follow } = require("../../db/models");
const {asyncHandler} = require('../utils');





router.delete('/follows/:id', asyncHandler(async (req, res) => {
    
    
        await Follow.destroy({
            where:{
                id: req.params.id
            }
        })
        
    

    res.json({
        message: "Follower deleted",
        
    });

}))

module.exports = router;