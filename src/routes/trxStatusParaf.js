const express = require("express");

const router = express.Router();

const {
    index
} = require("../controllers/trxstatusparafController")

router.get('/', index)

module.exports = router