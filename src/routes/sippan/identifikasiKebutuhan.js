const express = require("express")

const router = express.Router()

const {
    indexsippan,
    store,
    updatesippan, 
    kirimkasubdit,
    komentar,
    kirimunit,
    kirimrevisiunit
} = require("../../controllers/sippan/identifikasikebutuhanController")


router.get('/get-identifikasi/:kode_kegiatan_rkt/:kode_asset', indexsippan)
router.post('/',store)
router.put('/update-identifikasi/:kode_kegiatan_rkt/:kode_asset', updatesippan)

//Lempar-Lempar
router.put("/kirim-kasubdit/:kode_unit_kerja/:tahun", kirimkasubdit)
router.put("/komentar-kasubdit/:kode_kegiatan_rkt/:kode_asset", komentar)
router.put("/kirim-unit/:kode_unit_kerja/:tahun", kirimunit)
router.put("/kirim-revisi-kasubdit/:kode_unit_kerja/:tahun",kirimrevisiunit)

module.exports = router