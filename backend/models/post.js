"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Like }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "userId",
        as: 'author'
      })

      this.hasMany(Like, { foreignKey: "postId", as: "likes" })
    }

    toJSON() {
      return {
        ...this.get(),
        photo: `http://localhost:3000/photos/${this.get('photo')}`
      }
    }
  }
  Post.init(
    {
      caption: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    }
  );
  return Post;
};
