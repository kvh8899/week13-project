const express = require('express');
const apiStories = require('./stories');
const apiPostFollows = require('./postLikes');
const app = require('../../app');


const router = express.Router();

router.use('/stories',apiStories);
router.use('/likes',apiPostFollows);

module.exports = router;
