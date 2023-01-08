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
    getbarangbyunitfilter, 
    getbarangbyunitpenghapusan,
    jumlahkondisi,
    barangbyunitasset
} = require("../controllers/ruangController")

const {checker} = require("../helpers/utils")

const {validationResult} = require('express-validator')

const RuangSchema = require("../middlewares/request/ruang")

const timeout = require('connect-timeout')

router.get("/", index)

router.get("/:kode_unit", showbyunit )

router.get("/barangruang/:kode_ruang", showruang)

router.get("/barangunit/:kode_unit/:kode_asset", barangbyunit)

router.get("/barangunitdata/:kode_unit", barangbyunitdata)

router.get("/existing-bmut/:kode_unit/:kode_asset", jumlahbarangbyunit)

router.get("/get-barang-pemeliharaan/:kode_unit", getbarangbyunitfilter)

router.get("/get-jumlah-kondisi/:kode_unit/:kode_asset", jumlahkondisi)

router.post ("/",timeout('5s'), 
RuangSchema.store,
checker,
store)

router.get("/get-barang-penghapusan/:kode_unit", getbarangbyunitpenghapusan)

// router.get("/barang-unit-asset/:kode_unit/:kode_asset", getbarangbyunitpenghapusan)


module.exports = router