const express = require("express")
const router = express.Router()

const {
    index
} = require("../controllers/statuspemilikController")

router.get("/", index)

module.exports = router