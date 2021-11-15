"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userId: {
        allowNull: false,
        references: { model: "Users" },
        type: DataTypes.INTEGER,
      },
      postId: {
        allowNull: false,
        references: { model: "Posts" },
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Comment.hasMany(models.CommentLike, {foreignKey: 'commentId'});
  };
  return Comment;
};
