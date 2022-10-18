const express = require("express");

const router = express.Router();

const {
    index, 
    showbyunit, 
    barangbyunit,
    store,
    showruang,
} = require("../controllers/ruangController")

router.get("/", index)

router.get("/:kode_unit", showbyunit )

router.get("/barangruang/:kode_ruang", showruang)

router.get("/barangunit/:kode_unit", barangbyunit)

router.post ("/", store)

module.exports = router