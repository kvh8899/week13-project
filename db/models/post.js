"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: {
        allowNull: false,
        references: { model: "Users" },
        type: DataTypes.INTEGER,
      },
      heading: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      subText: {
        type: DataTypes.STRING,
      },
      headerImage: {
        type: DataTypes.TEXT,
      },
      mainText: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "userId",
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
    });
  };
  return Post;
};
