const express = require("express")
const router = express.Router();

const { validationResult } = require('express-validator')

const {checker} = require("../helpers/utils")

const {
    indexdetail,
    showbykodeform,
    store,
    antrean, 
    gettanahbyunit, 
    getangkutanbyunit,
    getbarangbyunit,
    getalatbesarbyunit,
    getbangunanbyunit,
    getbarangbyunitfilter,
    getbangunanairbyunit, 
    storefrompromise,
    antreannupeproc
} = require("../controllers/pembukuanController")

const pembukuanSchema = require("../middlewares/request/pembukuan")

router.get("/", indexdetail)

router.get("/antrean-nup-eproc", antreannupeproc)

router.get("/antrean", antrean)

router.get("/tanah/:kode_unit", gettanahbyunit)

router.get("/barang/:kode_unit",getbarangbyunit )

router.get("/barangfilter/:kode_unit",getbarangbyunitfilter )

router.get("/angkutan/:kode_unit",getangkutanbyunit )

router.get("/alatbesar/:kode_unit",getalatbesarbyunit )

router.get("/bangunan/:kode_unit",getbangunanbyunit )

router.get("/bangunan-air/:kode_unit", getbangunanairbyunit)


router.get("/:kode_pembukuan", showbykodeform)

router.post("/", 
    pembukuanSchema.store,
    checker,
store)

router.post("/store-promise", storefrompromise)

module.exports = router