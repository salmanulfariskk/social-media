'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" })
      this.belongsTo(Post, { foreignKey: "postId" })
    }
  }
  Like.init({
    postId: {type:DataTypes.INTEGER,allowNull:false},
    userId: {type:DataTypes.INTEGER,allowNull:false}
  }, {
    sequelize,
    tableName: "likes",
    modelName: 'Like',
  });
  return Like;
};