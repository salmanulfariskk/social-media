const jwt = require("jsonwebtoken");

/**
 * @param {{ userId: string }} payload
 * @param {import('jsonwebtoken').SignOptions & { secret: string }} options
 * @returns
 */
exports.createJwtToken = (payload, options) => {
  const { secret = process.env.JWT_TOKEN_SECRET, ...signOptions } =
    options || {};
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    ...(signOptions && signOptions),
  });
};

exports.verifyJwtToken = (token, options) => {
  const { secret = process.env.JWT_TOKEN_SECRET, ...verifyOptions } =
    options || {};
  try {
    const decode = jwt.verify(token, secret, {
      algorithms: ["HS256"],
      ...(verifyOptions && verifyOptions),
    });
    return { decode }
  } catch (error) {
    return { error }
  }
};
