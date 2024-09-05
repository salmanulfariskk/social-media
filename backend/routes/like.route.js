const router = require("express").Router()

const { toggleLikeHandler } = require("../controllers/like.controller")

router.post('/:postId', toggleLikeHandler)

module.exports = router