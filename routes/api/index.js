const express = require("express");
const createHttpError = require("http-errors");

const commentsApiRouter = require("./comments");
const followsApiRouter = require("./follows");
const storiesApiRouter = require("./stories");
const usersApiRouter = require("./users");

const router = express.Router();

router.use(commentsApiRouter);
router.use(followsApiRouter);
router.use(storiesApiRouter);
router.use(usersApiRouter);

// Catch unhandled requests to `/api` and forward to error handler
router.use((req, res, next) => {
  next(createHttpError(404));
});

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
