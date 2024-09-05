const { User } = require("../models");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const { createJwtToken } = require("../utils/jwt");

exports.createAccountHandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ where: { email } });
  console.log(exists);
  if (exists) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Email has already been taken.",
        code: 300,
        path: "email",
      },
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hash });
  const token = createJwtToken({ userId: user.id }, { expiresIn: "1d" });

  return res
    .cookie("auth-token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
    .status(201)
    .json({
      id: user.id,
      name: user.name,
    });
});
