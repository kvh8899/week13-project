const express = require('express');
const apiStories = require('./stories');
const apiComments = require('./comments');

const router = express.Router();

router.use('/stories',apiStories);
router.use('/comments',apiComments);

module.exports = router;
