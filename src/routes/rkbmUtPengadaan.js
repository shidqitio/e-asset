const express = require("express")
const router = express.Router()

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
    update
} = require("../controllers/rkmbutpengadaanController")

router.get("/:kode_unit_kerja", index)

router.get("/ppk/:kode_unit_kerja",indexppk)

router.get("/apip/:kode_unit_kerja", indexapip)

router.post("/", store)

router.post("/update", update)

router.put("/review/:kode_unit_kerja/:kode_kegiatan_rkt", review)

router.put("/reviewunit/:kode_unit_kerja/:kode_kegiatan_rkt", reviewunit)

router.put("/parafunit/:kode_unit_kerja",parafunit)

router.put("/parafunitselesai/:kode_unit_kerja/:kode_kegiatan_rkt",parafunitselesai)

router.put("/ajukanppk/:kode_unit_kerja", ajukanppk)

router.put("/parafapip/:kode_unit_kerja/:kode_kegiatan_rkt",parafapip)




module.exports = router