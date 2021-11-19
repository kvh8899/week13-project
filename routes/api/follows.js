const express = require('express');
const router = express.Router();
const { Follow } = require("../../db/models");






router.delete('/follows/:id', async (req, res) => {
    
    
        await Follow.destroy({
            where:{
                id: req.params.id
            }
        })
        
    

    res.json({
        Message: "Follower deleted",
        
    });

})

module.exports = router;