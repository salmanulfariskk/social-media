const { verifyJwtToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
  const token = req.cookies?.["auth-token"];
  if (!token)
    return res.status(401).json({ message: "Sign in to access the resource" });
  const { decode } = verifyJwtToken(token);
  if (!decode) {
    return res.status(403).json({ message: "Invalid token" });
  }
  req.userId = decode.userId;
  next();
};

module.exports = authenticate
