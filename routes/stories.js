const createError = require("http-errors");
const express = require("express");
const showdown = require("showdown");
const { check } = require("express-validator");

const { requireAuth } = require("../auth");
const { Post, User } = require("../db/models");
const {
  asyncHandler,
  csrfProtection,
  handleValidationErrors,
} = require("./utils");

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
  asyncHandler(async (req, res) => {
    const { storyId } = req.params;

    const story = await Post.findByPk(storyId, {
      include: [User],
    });

    console.log(story);

    if (!story) {
      throw createError(404);
    }

    const storyHtml = converter.makeHtml(story.mainText);

    res.render("story", {
      story: {
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
    });
  })
);

module.exports = router;
