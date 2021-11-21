const express = require("express");

const commentsApiRouter = require("./comments");
const followsApiRouter = require("./follows");
const storiesApiRouter = require("./stories");
const usersApiRouter = require("./users");

const router = express.Router();

router.use(commentsApiRouter);
router.use(followsApiRouter);
router.use(storiesApiRouter);
router.use(usersApiRouter);

module.exports = router;
