const express = require('express');
const apiStories = require('./stories');
const apiPostFollows = require('./postLikes');


const router = express.Router();

router.use('/stories',apiStories);
router.use('/likes',apiPostFollows);
//router.use('/comments',)

module.exports = router;
