const express = require("express")
const router = express.Router();


const{
    index,
    show
} = require("../controllers/trxanjabformbController");

router.get("/", index)

router.get("/:kode_jabatan_unit_kerja", show)

module.exports = router;