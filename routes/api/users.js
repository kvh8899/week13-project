const express = require("express");

const { asyncHandler } = require("../utils");
const { Follow } = require("../../db/models");
const { requireAuthApi } = require("../../auth");

const router = express.Router();

/* Add a follower to a user */
router.post(
  "/:id(\\d+)/followers",
  requireAuthApi,
  asyncHandler(async (req, res, next) => {
    /* Create a new follower */
    const newFollower = await Follow.create({
      userId: req.params.id,
      followerId: res.locals.user.id,
    });

    /* Set status 201, and
      send new follower as json response */
    res.status(201).json(newFollower);
  })
);

module.exports = router;
