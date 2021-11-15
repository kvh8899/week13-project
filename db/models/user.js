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
    User.hasMany(models.Post, {
      foreignKey: "userId",
    });
  };
  return User;
};
