const createError = require("http-errors");
const express = require("express");
const showdown = require("showdown");
const { check } = require("express-validator");

const { requireAuth, restoreUser } = require("../auth");
const {
  Comment,
  CommentLike,
  Follow,
  Post,
  PostLike,
  User,
} = require("../db/models");
const {
  asyncHandler,
  csrfProtection,
  handleValidationErrors,
} = require("./utils");
const { formatTimeSince } = require("../utils/date-utils");

const converter = new showdown.Converter();
converter.setOption("noHeaderId", true);

const router = express.Router();

router.get("/new", requireAuth, csrfProtection, (req, res) => {
  res.render("create-story", {
    csrfToken: req.csrfToken(),
    story: {},
  });
});

const storyValidators = [
  check("heading")
    .exists({ checkFalsey: true })
    .isLength({ min: 1 })
    .withMessage("Please provide a Title."),

  check("headerImage")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("The URL provided for the story image is invalid."),

  check("mainText")
    .exists({ checkFalsey: true })
    .isLength({ min: 1 })
    .withMessage("The story's body cannot be empty."),
];

router.post(
  "/new",
  requireAuth,
  csrfProtection,
  storyValidators,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { heading, subText, headerImage, mainText } = req.body;

    if (res.locals.errors) {
      return res.render("create-story", {
        csrfToken: req.csrfToken(),
        story: {
          heading,
          subText,
          headerImage,
          mainText,
        },
      });
    }

    const story = await Post.create({
      userId: res.locals.user.id,
      heading,
      subText: subText || null,
      headerImage: headerImage || null,
      mainText,
    });
    res.redirect(`/stories/${story.id}`);
  })
);

router.get(
  "/:storyId(\\d+)",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { storyId } = req.params;

    const story = await Post.findByPk(storyId, {
      include: [
        { model: Comment, include: [CommentLike, User]},
        PostLike,
        { model: User, include: [{ model: User, as: "Followers" }] },
      ],
    });

    if (!story) {
      throw createError(404);
    }

    let userFollow;
    if (res.locals.authenticated && res.locals.user) {
      userFollow = await Follow.findOne({
        where: {
          userId: story.User.id,
          followerId: res.locals.user.id,
        },
      });
    }

    let userLike;
    if (res.locals.authenticated && res.locals.user) {
      userLike = await PostLike.findOne({
        where: {
          postId: storyId,
          userId: res.locals.user.id,
        },
      });
    }
    //sort comments by newest
    story.Comments.sort((b,a) => {
     return a.createdAt.getTime() - b.createdAt.getTime();
    });
    const storyHtml = converter.makeHtml(story.mainText);

    res.render("story", {
      story: {
        id: story.id,
        heading: story.heading,
        subText: story.subText,
        headerImage: story.headerImage,
        mainText: storyHtml,
        user: story.User,
        createdAt: story.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      },
      comments: story.Comments,
      likes: story.PostLikes,
      userFollow: userFollow || {},
      userLike: userLike || {},
      formatTimeSince,
    });
  })
);
//router to create a comment
router.post('/:id(\\d+)/comment',restoreUser, asyncHandler(async(req,res) => {
  if(!res.locals.user){
      res.redirect('/login');
  }else{
    await Comment.create({
        userId: res.locals.user.id,
        postId: req.params.id,
        content: req.body.commentBox
    })
    res.redirect('/stories/' + `${req.params.id}#comments`);
  }
}));
module.exports = router;
