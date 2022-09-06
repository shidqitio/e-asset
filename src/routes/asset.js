const express = require("express")
const router = express.Router();

const {
    index, 
    show
} = require("../controllers/assetController")

router.get("/", index)

router.get("/:kode_asset", show)

module.exports = router