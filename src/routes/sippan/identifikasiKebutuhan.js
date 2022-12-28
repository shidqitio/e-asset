const express = require("express")

const router = express.Router()

const {
    indexsippan,
    store,
    updatesippan
} = require("../../controllers/sippan/identifikasikebutuhanController")


router.get('/get-identifikasi/:kode_kegiatan_rkt/:kode_asset', indexsippan)
router.post('/',store)
router.put('/update-identifikasi/:kode_kegiatan_rkt/:kode_asset', updatesippan)

module.exports = router