const { createSessionHandler } = require("../controllers/session.controller")

const router = require("express").Router()

router.post('/', createSessionHandler)

module.exports = router