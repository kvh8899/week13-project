'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment_like = sequelize.define('Comment_like', {
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  Comment_like.associate = function(models) {
    // associations can be defined here
  };
  return Comment_like;
};