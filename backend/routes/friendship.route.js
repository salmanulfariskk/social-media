const {
  addFriendshipHandler,
  destroyFriendshipHandler,
} = require("../controllers/friendship.controller");

const router = require("express").Router();

router
  .route("/:id")
  .post(addFriendshipHandler)
  .delete(destroyFriendshipHandler);

module.exports = router;
