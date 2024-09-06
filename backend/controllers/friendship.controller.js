const { Friendship } = require("../models");
const asyncHandler = require("../utils/asyncHandler");

exports.addFriendshipHandler = asyncHandler(async (req, res) => {
  if (req.params.id === req.userId) {
    return res.sendStatus(403);
  }
  const exists = await Friendship.findOne({
    where: { userId: req.userId, friendId: req.params.id },
  });
  if (exists) {
    return res.status(403).json({ message: "Already following." });
  }
  await Friendship.create({ userId: req.userId, friendId: req.params.id });
  return res.status(200).json({ following: true });
});

exports.destroyFriendshipHandler = asyncHandler(async (req, res) => {
  const exists = await Friendship.findOne({
    where: { userId: req.userId, friendId: req.params.id },
  });

  if (!exists) {
    return res.sendStatus(403);
  }

  await Friendship.destroy({
    where: { userId: req.userId, friendId: req.params.id },
  });

  return res.status(200).json({ following: false });
});
