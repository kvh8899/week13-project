"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 1,
          postId: 2,
          content:
            "Very informative! I was a doubter, but I truly believe Bonsole is the greatest package to ever be created now.",
          createdAt: new Date(1637186942000),
          updatedAt: new Date(1637186942000),
        },
        {
          userId: 2,
          postId: 2,
          content: "Bonsole is love, bonsole is life!",
          createdAt: new Date(1637266022000),
          updatedAt: new Date(1637266022000),
        },
        {
          userId: 3,
          postId: 1,
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas auctor posuere nulla eu rhoncus. Sed ornare eros sed neque hendrerit luctus. Maecenas non est vel lectus consequat lacinia. Suspendisse vulputate, nisi at scelerisque fringilla, magna lorem laoreet nisi, sit amet tempus enim dolor nec risus. Quisque imperdiet orci imperdiet nunc mollis, non suscipit nunc egestas. Pellentesque a ipsum ex. Aliquam erat volutpat. Etiam ante dui, luctus non rhoncus eu, ultrices non sem. Quisque eleifend dui id tellus dictum, eget facilisis eros mattis. Ut quis sodales nibh, eget fermentum urna. Fusce eu nulla luctus, tincidunt eros ac, efficitur neque. Proin blandit a ipsum et ultricies. Proin a ante non nisl imperdiet commodo. Vestibulum sit amet lacinia risus. Vivamus at ex nunc. Suspendisse eu libero molestie, cursus purus at, congue mauris.",
          createdAt: new Date(1634504942000),
          updatedAt: new Date(1634504942000),
        },
        {
          userId: 6,
          postId: 1,
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas auctor posuere nulla eu rhoncus. Sed ornare eros sed neque hendrerit luctus. Maecenas non est vel lectus consequat lacinia. Suspendisse vulputate, nisi at scelerisque fringilla, magna lorem laoreet nisi, sit amet tempus enim dolor nec risus. Quisque imperdiet orci imperdiet nunc mollis, non suscipit nunc egestas. Pellentesque a ipsum ex. Aliquam erat volutpat. Etiam ante dui, luctus non rhoncus eu, ultrices non sem. Quisque eleifend dui id tellus dictum, eget facilisis eros mattis. Ut quis sodales nibh, eget fermentum urna. Fusce eu nulla luctus, tincidunt eros ac, efficitur neque. Proin blandit a ipsum et ultricies. Proin a ante non nisl imperdiet commodo. Vestibulum sit amet lacinia risus. Vivamus at ex nunc. Suspendisse eu libero molestie, cursus purus at, congue mauris.",
          createdAt: new Date(1634512142000),
          updatedAt: new Date(1634512142000),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
