const { User, sequelize } = require("../models");
const asyncHandler = require("../utils/asyncHandler");
const { createJwtToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

exports.createSessionHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(401).json({
      success: false,
      error: {
        code: 301,
        message: "Invalid email or password",
        path: ["email", "passord"],
      },
    });
  }
  const token = createJwtToken({ userId: user.id });

  return res
    .cookie("auth-token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
    .status(201)
    .json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
});

exports.currentSessionHandler = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: {
      exclude: ["password"],
      include: [
        [
          sequelize.literal(`
            (SELECT COUNT(*) FROM friendships WHERE friendships.userId = ${sequelize.escape(
              req.userId
            )})
          `),
          "following",
        ],
        [
          sequelize.literal(`
            (SELECT COUNT(*) FROM friendships WHERE friendships.friendId = ${sequelize.escape(
              req.userId
            )})
          `),
          "followers",
        ],
      ],
    },
  });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Session not found." });
  }
  return res.status(200).json(user);
});

exports.destroySessionHandler = (req, res) => {
  return res.clearCookie("auth-token").sendStatus(204);
};
