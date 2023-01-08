const express = require("express")
const router = express.Router()

const {validationResult} = require("express-validator")
const RkbmPengadaanSchema = require("../middlewares/request/rkbmUtPengadaan")
const {checker} = require("../helpers/utils")

// const {authenticate} = require("../middlewares/auth")

const {
    index, 
    indexapip,
    indexppk,
    store, 
    review, 
    parafunit, 
    parafunitselesai,
    reviewunit,
    parafapip,
    ajukanppk, 
    perbaikanppk,
    perbaikanunit, 
    setujuppk,
    update,
    destroy,
    destroyfromhead
} = require("../controllers/rkmbutpengadaanController")

router.get("/:kode_unit_kerja",index)

router.get("/ppk/:kode_unit_kerja",indexppk)

router.get("/apip/:kode_unit_kerja", indexapip)

router.post("/", 
RkbmPengadaanSchema.store, 
checker,
store)

router.post("/update", 
RkbmPengadaanSchema.store, 
checker,
update)

router.put("/review/:kode_unit_kerja/:kode_kegiatan_rkt", 
RkbmPengadaanSchema.update,
checker,
review)

router.put("/reviewunit/:kode_unit_kerja/:kode_kegiatan_rkt", 
RkbmPengadaanSchema.update,
checker,
reviewunit)

router.put("/parafunit/:kode_unit_kerja",parafunit)

router.put("/parafunitselesai/:kode_unit_kerja/:kode_kegiatan_rkt",parafunitselesai)

router.put("/ajukanppk/:kode_unit_kerja", ajukanppk)

router.put("/komentarppk/:kode_kegiatan_rkt/:kode_unit_kerja", perbaikanppk)

router.put("/perbaikanunit/:kode_kegiatan_rkt/:kode_unit_kerja", 
RkbmPengadaanSchema.update,
checker,
perbaikanunit)

router.put("/parafapip/:kode_unit_kerja/:kode_kegiatan_rkt",parafapip)

router.put("/setujuppk/:kode_kegiatan_rkt/:kode_unit_kerja", setujuppk)

router.delete("/delete/:kode_unit_kerja/:kode_kegiatan_rkt", destroy)

router.delete("/delete/header/:kode_unit_kerja/:kode_kegiatan_rkt", destroyfromhead)



module.exports = router