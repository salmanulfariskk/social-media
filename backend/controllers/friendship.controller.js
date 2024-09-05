const { Friendship } = require("../models");
const asyncHandler = require("../utils/asyncHandler");

exports.addFriendshipHandler = asyncHandler(async (req, res) => {
  const exists = await Friendship.findOne({
    where: { userId: req.userId, friendId: req.params.id },
  });
  if (exists) {
    return res.status(403).json({ message: "Already following." });
  }
  await Friendship.create({ userId: req.userId, friendId: req.params.id });
  return res.status(200).json({ following: true });
});

// exports.  destroyFriendshipHandler = asyncHandler(async (req, res) => {
//   console.log('test 1');

//   const exists = await Friendship.findOne({
//     where: { userId: req.userId, friendId: req.params.id },
//   });
//   console.log('test 2');
//   if (!exists) {
//     console.log('test 3');
//     return res.sendStatus(403)
//   }
//   await Friendship.destroy({ userId: req.userId, friendId: req.params.id })
//   console.log('test 4');
//   return res.status(200).json({ following: false })
// });

exports.destroyFriendshipHandler = asyncHandler(async (req, res) => {

  const exists = await Friendship.findOne({
    where: { userId: req.userId, friendId: req.params.id },
  });

  if (!exists) {
    return res.sendStatus(403);
  }

  // Corrected destroy method with where clause
  await Friendship.destroy({
    where: { userId: req.userId, friendId: req.params.id },
  });

  return res.status(200).json({ following: false });
});
