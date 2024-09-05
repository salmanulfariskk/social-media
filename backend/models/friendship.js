"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(User, { foreignKey: "friendId" })
    }
  }
  Friendship.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      friendId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'friendships',
      modelName: "Friendship",
    }
  );
  return Friendship;
};
