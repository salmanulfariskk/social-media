const asyncHandler = require("../utils/asyncHandler");
const { Post, User, Like, sequelize } = require("../models");
const getUserRelationAttributes = require("../utils/get-user-relation-attributes");

exports.createPostHandler = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  try {
    const post = await Post.create({
      caption,
      photo: file.filename,
      userId: req.userId, // Ensure req.userId is set
    });

    return res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Failed to create post" });
  }
});

exports.getAllPostsHandler = asyncHandler(async (req, res) => {
  console.log(req.query)
  const { page, limit } = req.query;
  const pageSize = parseInt(limit) + 1;

  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
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
      offset,
      limit: pageSize,
      order: [["createdAt", "DESC"]],
    });

    const hasMore = posts.length > parseInt(limit);

    return res
      .status(200)
      .json({ posts: posts.slice(0, parseInt(limit)), pageContext: { hasMore } });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
});

exports.getSinglePostHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
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

    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching single post:", error);
    return res.status(500).json({ message: "Failed to fetch post" });
  }
});
