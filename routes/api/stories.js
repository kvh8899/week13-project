const createError = require("http-errors");
const express = require("express");

const { asyncHandler } = require("../utils");
const { PostLike } = require("../../db/models");
const { requireAuthApi } = require("../../auth");

const router = express.Router();

/* Like a story */
router.post(
  "/:id(\\d+)/likes",
  requireAuthApi,
  asyncHandler(async (req, res, next) => {
    /* If the user is authenticated,
      create a new like */
    const postLike = await PostLike.create({
      userId: res.locals.user.id,
      postId: req.params.id,
    });
    /* Set 201 status code for response, and
      send newPostLike as json response. */
    res.status(201).json(postLike);
  })
);

/* Unlike a story */
router.delete(
  "/likes/:id(\\d+)",
  requireAuthApi,
  asyncHandler(async (req, res, next) => {
    /* Initialize like object */
    const like = await PostLike.findByPk(req.params.id);

    /* Return error 404, if 
      there is no like object */
    if (!like) {
      return next(createError(404));
    }

    if (res.locals.user.id !== like.userId) {
      /* Return error 401 if
        current user is not the liker */
      return next(createError(401));
    }

    /* Destroy like if
      user is authenticated, and
      current user is the liker. */
    await like.destroy();

    /* Respond with json message,
      "Story like deleted" */
    res.json({ message: "Story like deleted" });
  })
);

module.exports = router;
