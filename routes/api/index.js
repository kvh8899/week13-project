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

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === "production";
  res.json({
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = router;
