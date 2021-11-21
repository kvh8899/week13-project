const express = require('express');
const apiStories = require('./stories');


const router = express.Router();

router.use('/stories',apiStories);

//router.use('/comments',)

module.exports = router;
