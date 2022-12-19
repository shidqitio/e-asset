const express = require("express");

const router = express.Router();

const {
    index, 
    genpdf
} = require("../controllers/trxrkbmutallController")

router.get('/', index)

router.post("/generate", genpdf)

module.exports = router