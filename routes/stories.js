const express = require("express");

const { Post } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");

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

module.exports = router;
