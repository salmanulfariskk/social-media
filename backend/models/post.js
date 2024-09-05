"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User, Like }) {
      this.belongsTo(User, {
        foreignKey: "userId",
        as: 'author'
      });
      this.hasMany(Like, { foreignKey: "postId", as: "likes" });
    }

    toJSON() {
      return {
        ...this.get(),
        photo: `http://localhost:3000/photos/${this.get('photo')}`
      };
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