const express = require("express")
const router = express.Router()
const tipsController = require("../controllers/tipsController")

router.get("/", tipsController.getTips)

module.exports = router

