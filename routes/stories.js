const express = require("express");
const showdown = require("showdown");

const { Post } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");

const converter = new showdown.Converter();
converter.setOption("noHeaderId", true);

const router = express.Router();

router.get("/new", csrfProtection, (req, res) => {
  res.render("create-story", {
    csrfToken: req.csrfToken(),
    story: {},
  });
});

router.post(
  "/new",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { heading, subText, headerImage, mainText } = req.body;

    // TODO: Implement validators

    const story = await Post.create({
      userId: 3,
      heading,
      subText,
      headerImage,
      mainText,
    });
    res.redirect(`/stories/${story.id}`);
  })
);

router.get(
  "/:storyId(\\d+)",
  asyncHandler(async (req, res) => {
    const { storyId } = req.params;

    const story = await Post.findByPk(storyId);

    const storyHtml = converter.makeHtml(story.mainText);

    res.render("story", {
      story: {
        heading: story.heading,
        subText: story.subText,
        headerImage: story.headerImage,
        mainText: storyHtml,
      },
    });
  })
);

module.exports = router;
