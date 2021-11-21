
const express = require('express');
const router = express.Router();
const commentsApiRouter = require('./comments');
const followsApiRouter = require('./follows');
const stories = require('./stories');
const users = require('./users');


router.use(commentsApiRouter);
router.use(followsApiRouter);
router.use(stories);
router.use(users);


module.exports = router;

