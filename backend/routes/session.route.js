const {
  createSessionHandler,
  currentSessionHandler,
  destroySessionHandler,
} = require("../controllers/session.controller");
const authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

router.post("/", createSessionHandler);

router.get("/current_session", authenticate, currentSessionHandler);

router.delete("/", authenticate, destroySessionHandler);

module.exports = router;
