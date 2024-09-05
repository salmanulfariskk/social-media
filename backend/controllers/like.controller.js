const asyncHandler = require("../utils/asyncHandler");
const { Like } = require("../models");

exports.toggleLikeHandler = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const liked = await Like.findOne({ where: { postId, userId: req.userId } });
  if (liked) {
    await liked.destroy();
    return res.status(200).json({ message: "Unliked" });
  }

  await Like.create({ postId, userId: req.userId });
  return res.status(200).json({ message: "Liked" });
});
