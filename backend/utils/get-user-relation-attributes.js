const { Friendship, sequelize } = require("../models")

/**
 * Generate the attributes for including friendship information and excluding password.
 * @param {number} currentUserId - The ID of the current user.
 * @returns {object} - Sequelize attributes with friendship fields and user details without password.
 */
const getUserRelationAttributes = (currentUserId) => {
  if (typeof currentUserId !== 'number') {
    throw new TypeError('currentUserId must be a number');
  }

  return {
    exclude: ["password"],
    include: [
      [
        sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM friendships
            WHERE friendships.userId = ${sequelize.escape(currentUserId)}
              AND friendships.friendId = author.id
          )
        `),
        "following",
      ],
      [
        sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM friendships
            WHERE friendships.userId = author.id
              AND friendships.friendId = ${sequelize.escape(currentUserId)}
          )
        `),
        "followedBy",
      ],
    ],
  };
};

module.exports = getUserRelationAttributes;