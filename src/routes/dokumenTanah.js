const express = require("express")
const router = express.Router()

const {
    index
} = require("../controllers/dokumentanahController")

router.get("/", index)

module.exports = router