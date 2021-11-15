"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unqiue: true,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unqiue: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Comment, {
      foreignKey: "userId",
    });
    User.hasMany(models.Post, {
      foreignKey: "userId",
    });
    User.hasMany(models.CommentLike, {foreignKey: 'userId'});
    User.belongsToMany(models.User, {
      through: models.Follow,
      foreignKey: "followerId",
      otherKey:"id",
      as: "Following"
    });
    User.belongsToMany(models.User, {
      through: models.Follow,
      foreignKey: "userId",
      otherKey:"id",
      as: "Followers"
    });
    User.hasMany(models.PostLike, {foreignKey: 'postId'});
   
  };
 
  return User;
};
