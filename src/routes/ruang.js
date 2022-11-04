const express = require("express");

const router = express.Router();

const {
    index, 
    showbyunit, 
    barangbyunit,
    store,
    showruang,
    barangbyunitdata,
    jumlahbarangbyunit, 
    getbarangbyunitfilter
} = require("../controllers/ruangController")

router.get("/", index)

router.get("/:kode_unit", showbyunit )

router.get("/barangruang/:kode_ruang", showruang)

router.get("/barangunit/:kode_unit/:kode_asset", barangbyunit)

router.get("/barangunitdata/:kode_unit", barangbyunitdata)

router.get("/existing-bmut/:kode_unit/:kode_asset", jumlahbarangbyunit)

router.get("/get-barang-pemeliharaan/:kode_unit", getbarangbyunitfilter)

router.post ("/", store)

module.exports = router