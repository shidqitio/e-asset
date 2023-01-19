const express = require("express")
const router = express.Router();

const {
    index, 
    detailsusut
} = require("../controllers/trxpenyusutanController")

router.get("/", index)
router.get("/detail/:kode_barang/:kode_pembukuan", detailsusut)

module.exports = router