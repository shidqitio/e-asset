const express = require("express")
const router = express.Router();

const {
    index
} = require("../controllers/trxpenyusutanController")

router.get("/", index)

module.exports = router