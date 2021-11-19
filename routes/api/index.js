
const express = require('express');
const router = express.Router();
const commentsApiRouter = require('./comments');
const followsAPiRouter = require('./follows');
const stories = require('./stories');
const users = require('./users');



router.use(commentsApiRouter);
router.use(followsAPiRouter);
router.use(stories);
router.use(users);

module.exports = router;


