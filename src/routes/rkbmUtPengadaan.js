const express = require("express")
const router = express.Router()

const {
    indexunit, 
    indexapip,
    store, 
    review, 
    parafunit, 
    parafunitselesai,
    reviewunit,
    parafapip, 
    update
} = require("../controllers/rkmbutpengadaanController")

router.get("/unit/:kode_unit_kerja", indexunit)

router.get("/apip", indexapip)

router.post("/", store)

router.post("/update", update)

router.put("/review/:kode_unit_kerja/:kode_kegiatan_rkt", review)

router.put("/reviewunit/:kode_unit_kerja/:kode_kegiatan_rkt", reviewunit)

router.put("/parafunit/:kode_unit_kerja/:kode_kegiatan_rkt",parafunit)

router.put("/parafunitselesai/:kode_unit_kerja/:kode_kegiatan_rkt",parafunitselesai)

router.put("/parafapip/:kode_unit_kerja/:kode_kegiatan_rkt",parafapip)




module.exports = router