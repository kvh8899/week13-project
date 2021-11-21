"use strict";

/**
 * Adds cascade deletion of Posts and Comments
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("PostLikes", "PostLikes_postId_fkey");
    await queryInterface.addConstraint("PostLikes", {
      fields: ["postId"],
      type: "foreign key",
      name: "PostLikes_postId_fkey",
      references: {
        table: "Posts",
        field: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.removeConstraint("Comments", "Comments_postId_fkey");
    await queryInterface.addConstraint("Comments", {
      fields: ["postId"],
      type: "foreign key",
      name: "Comments_postId_fkey",
      references: {
        table: "Posts",
        field: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.removeConstraint(
      "CommentLikes",
      "CommentLikes_commentId_fkey"
    );
    await queryInterface.addConstraint("CommentLikes", {
      fields: ["commentId"],
      type: "foreign key",
      name: "CommentLikes_commentId_fkey",
      references: {
        table: "Comments",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("PostLikes", "PostLikes_postId_fkey");
    await queryInterface.addConstraint("PostLikes", {
      fields: ["postId"],
      type: "foreign key",
      name: "PostLikes_postId_fkey",
      references: {
        table: "Posts",
        field: "id",
      },
    });

    await queryInterface.removeConstraint("Comments", "Comments_postId_fkey");
    await queryInterface.addConstraint("Comments", {
      fields: ["postId"],
      type: "foreign key",
      name: "Comments_postId_fkey",
      references: {
        table: "Posts",
        field: "id",
      },
    });

    await queryInterface.removeConstraint(
      "CommentLikes",
      "CommentLikes_commentId_fkey"
    );
    await queryInterface.addConstraint("CommentLikes", {
      fields: ["commentId"],
      type: "foreign key",
      name: "CommentLikes_commentId_fkey",
      references: {
        table: "Comments",
        field: "id",
      },
    });
  },
};
