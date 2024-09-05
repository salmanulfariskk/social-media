const router = require("express").Router()
const { createAccountHandler } = require("../controllers/account.controller")

router.post("/create", createAccountHandler)

module.exports = router