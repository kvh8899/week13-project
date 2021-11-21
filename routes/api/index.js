const express = require('express');
const apiStories = require('./stories');
const apiComments = require('./comments');
const apiUsers = require('./users');
const router = express.Router();

router.use('/stories',apiStories);
router.use('/comments',apiComments);
router.use('/users',apiUsers);
module.exports = router;
