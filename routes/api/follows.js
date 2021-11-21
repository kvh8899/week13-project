const createError = require("http-errors");
const express = require("express");

const { asyncHandler } = require("../utils");
const { Follow } = require("../../db/models");
const { requireAuthApi } = require("../../auth");

const router = express.Router();

/* Delete a follower from a user */
router.delete(
  "/follows/:id",
  requireAuthApi,
  asyncHandler(async (req, res, next) => {
    /* Initialize follow object */
    const follow = await Follow.findByPk(req.params.id);

    /* Return error 404, if 
      there is no follow object */
    if (!follow) {
      return next(createError(404));
    }

    if (res.locals.user.id !== follow.followerId) {
      /* Return error 401 if
        user is not the follower */
      return next(createError(401));
    } else if (res.locals.user.id === follow.followerId) {
      /* Destroy follow if
        user is authenticated, and
        user is follower */
      await follow.destroy();
    }

    /* Respond with json message,
      "Follower deleted" */
    res.json({ message: "Follower deleted" });
  })
);

module.exports = router;
