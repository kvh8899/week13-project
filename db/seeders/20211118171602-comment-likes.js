"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "CommentLikes",
      [
        {
          userId: 1,
          commentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          commentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          commentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          commentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          commentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          commentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          commentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          commentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          commentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          commentId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CommentLikes", null, {});
  },
};
