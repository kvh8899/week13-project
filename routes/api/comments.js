const createError = require("http-errors");
const express = require("express");

const { asyncHandler } = require("../utils");
const { CommentLike } = require("../../db/models");
const { requireAuthApi } = require("../../auth");

const router = express.Router();

router.delete(
  "/:id(\\d+)",
  requireAuthApi,
  asyncHandler(async (req, res, next) => {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      include: [User, CommentLike],
    });
    /* 
      check if logged in
          if not logged in, redirect to login page
      otherwise check if user is owner of comment
          if not owner, then deny authorization to delete
    */

    if (res.locals.user.id !== comment.User.id) {
      return next(createError(401));
    } else {
      comment.CommentLikes.forEach((e) => {
        e.destroy();
      });
      comment.destroy();
    }
    res.json({ message: "deleted" });
  })
);

/* Like a comment */
router.post(
  "/:id(\\d+)/likes",
  requireAuthApi,
  asyncHandler(async (req, res, next) => {
    /* Create comment like */
    const likedComment = await CommentLike.create({
      userId: res.locals.user.id,
      commentId: req.params.id,
    });

    /* Set status 201, and
      respond with json, likedComment */
    res.status(201).json(likedComment);
  })
);

/* Unlike a comment */
router.delete(
  "/likes/:id(\\d+)",
  requireAuthApi,
  asyncHandler(async (req, res, next) => {
    /* Initialize like object */
    const like = await CommentLike.findByPk(req.params.id);

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
      "Comment like deleted" */
    res.json({ message: "Comment like deleted" });
  })
);

module.exports = router;
