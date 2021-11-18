const express = require('express');
const router = express.Router();
const { Follow } = require("../db/models");




router.delete('/followers/:id', async (req, res) => {
    await Follow.destroy({
        where:{id}
    })

    res.redirect('/followers');

})

module.exports = router;