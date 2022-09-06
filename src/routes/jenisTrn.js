const express = require("express");
const router = express.Router();

const { 
    index, 
    show,
    store
} = require("../controllers/jenistrnController")

router.get("/", index)

router.get("/:no_sppa", show)

router.post("/", store)

module.exports = router