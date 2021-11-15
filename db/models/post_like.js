'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post_like = sequelize.define('Post_like', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Post_like.associate = function(models) {
    // associations can be defined here
  };
  return Post_like;
};