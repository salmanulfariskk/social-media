const asyncHandler = require("../utils/asyncHandler");
const { Post, User, Like, sequelize } = require("../models");
const getUserRelationAttributes = require("../utils/get-user-relation-attributes");

exports.createPostHandler = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const post = await Post.create({
    caption,
    photo: file.filename,
    userId: req.userId,
  });

  return res.status(201).json(post);
});

exports.getAllPostsHandler = asyncHandler(async (req, res) => {
  console.log(typeof req.userId);
  const posts = await Post.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(`
            (SELECT COUNT(*) 
             FROM likes 
             WHERE likes.postId = Post.id
            )
          `),
          "likeCount",
        ],
        [
          sequelize.literal(`
            EXISTS (
              SELECT 1 FROM likes WHERE likes.postId = Post.id AND likes.userId = ${sequelize.escape(
                req.userId
              )}
            )  
          `),
          "liked",
        ],
      ],
    },
    include: [
      {
        model: User,
        as: "author",
        attributes: getUserRelationAttributes(req.userId),
      },
    ],
  });
  return res.status(200).json(posts);
});

exports.getSinglePostHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: { id },
    attributes: {
      include: [
        [
          sequelize.literal(`
            (SELECT COUNT(*) 
             FROM likes 
             WHERE likes.postId = Post.id
            )
          `),
          "likeCount",
        ],
        [
          sequelize.literal(`
            EXISTS (
              SELECT 1 FROM likes WHERE likes.postId = Post.id AND likes.userId = ${sequelize.escape(
                req.userId
              )}
            )  
          `),
          "liked",
        ],
      ],
    },
    include: [
      {
        model: User,
        as: "author",
        attributes: getUserRelationAttributes(req.userId),
      },
    ],
  });
  return res.status(200).json(post);
});
