const express = require("express")
const router = express.Router();


const{
    index,
    show
} = require("../controllers/trxanjabformaController");

router.get("/", index)

router.get("/:kode_unit_kerja/:kode_jabatan_unit_kerja", show)

module.exports = router;