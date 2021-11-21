'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    
  };
  return Follow;
};